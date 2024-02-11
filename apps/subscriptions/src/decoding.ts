// import { X509Certificate } from 'crypto';
import * as jose from 'jose';
import { X509Certificate } from '@peculiar/x509';

// export async function decodeTransactions(
// 	signedTransactions: JWSTransaction[],
// 	rootCertFingerprint?: string
// ): Promise<JWSTransactionDecodedPayload[]> {
// 	return Promise.all(signedTransactions.map((transaction) => decodeJWS(transaction, rootCertFingerprint)));
// }

// export async function decodeTransaction(transaction: JWSTransaction, rootCertFingerprint?: string): Promise<JWSTransactionDecodedPayload> {
// 	return decodeJWS(transaction, rootCertFingerprint);
// }

// export async function decodeRenewalInfo(info: JWSRenewalInfo, rootCertFingerprint?: string): Promise<JWSRenewalInfoDecodedPayload> {
// 	return decodeJWS(info, rootCertFingerprint);
// }

export async function decodeNotificationPayload<T = any>(payload: string, rootCertFingerprint?: string): Promise<T> {
	return decodeJWS(payload, rootCertFingerprint);
}

/**
 * Decodes and verifies an object signed by the App Store according to JWS.
 * See: https://developer.apple.com/documentation/appstoreserverapi/jwstransaction
 * @param token JWS token
 * @param rootCertFingerprint Root certificate to validate against. Defaults to Apple's G3 CA but can be overriden for testing purposes.
 */
async function decodeJWS(token: string, rootCertFingerprint: string = APPLE_ROOT_CA_G3_FINGERPRINT): Promise<any> {
	// Extracts the key used to sign the JWS from the header of the token
	const getKey: jose.CompactVerifyGetKey = async (protectedHeader, _token) => {
		if (protectedHeader.x5c != null) {
			await validateCertificates(protectedHeader.x5c, rootCertFingerprint);
		}

		// jose will not import the certificate unless it is in a proper PKCS8 format.
		const certs = protectedHeader.x5c?.map((c) => `-----BEGIN CERTIFICATE-----\n${c}\n-----END CERTIFICATE-----`) ?? [];

		// RC 7515 stipulates that the key used to sign the JWS must be the first in the chain.
		// https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6
		return jose.importX509(certs[0], 'ES256');
	};

	const { payload } = await jose.compactVerify(token, getKey);

	const decoded = new TextDecoder().decode(payload);
	const json = JSON.parse(decoded);

	return json;
}

function bufferToHex(buffer: ArrayBuffer) {
	return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(':');
}

// SHA-256 fingerprint of Apple's "Apple Root CA - G3 Root" certificate.
// The root certificate can be obtained here: https://www.apple.com/certificateauthority/
// This is used to verify that JWS have been signed using a key coming from Apple.
export const APPLE_ROOT_CA_G3_FINGERPRINT =
	'63:34:3A:BF:B8:9A:6A:03:EB:B5:7E:9B:3F:5F:A7:BE:7C:4F:5C:75:6F:30:17:B3:A8:C4:88:C3:65:3E:91:79';

/**
 * Validates a certificate chain provided in the x5c field of a decoded header of a JWS.
 * The certificates must be valid and have been signed by the provided
 * @param certificates A chain of certificates
 * @param rootCertFingerprint Expected SHA256 signature of the root certificate
 * @throws {CertificateValidationError} if any of the validation checks fail
 */
async function validateCertificates(certificates: string[], rootCertFingerprint: string) {
	const x509certs = certificates.map((c) => new X509Certificate(c));

	// // Check dates
	const now = new Date();
	const datesValid = x509certs.every((c) => new Date(c.notBefore) < now && now < new Date(c.notAfter));
	if (!datesValid) {
		throw new Error();
	}

	// Check that each certificate, except for the last, is issued by the subsequent one.
	if (certificates.length >= 2) {
		for (let i = 0; i < x509certs.length - 1; i++) {
			const subject = x509certs[i];
			const issuer = x509certs[i + 1];

			if (subject.issuer !== issuer.subject || (await subject.verify({ publicKey: issuer.publicKey })) === false) {
				throw new Error();
			}
		}
	}

	// Ensure that the last certificate in the chain is the expected root CA.
	const lastCert = x509certs[x509certs.length - 1];
	const lastCertFingerprint = bufferToHex(await lastCert.getThumbprint('SHA-256'));

	if (lastCertFingerprint !== rootCertFingerprint) {
		throw new Error();
	}
}

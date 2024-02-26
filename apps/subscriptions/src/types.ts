type UnixTime = number;

export interface SubscriptionSignedTransactionInfo {
	transactionId: string;
	originalTransactionId: string;
	productId: string;
	purchaseDate: UnixTime;
	originalPurchaseDate: UnixTime;
	expiresDate: UnixTime;
	transactionReason: string;
}

export interface SubscriptionSignedRenewalInfo {
	originalTransactionId: string;
	autoRenewProductId: string;
	productId: string;
	autoRenewStatus: number;
	signedDate: UnixTime;
	environment: 'Sandbox' | 'Production';
	recentSubscriptionStartDate: UnixTime;
	renewalDate: UnixTime;
}

export interface SubscriptionPayload {
	notificationUUID: string;
	data: {
		appAppleId: number;
		bundleId: string;
		bundleVersion: string;
		environment: 'Sandbox' | 'Production';
		signedTransactionInfo: string;
		signedRenewalInfo: string;
		status: number;
	};
	version: '2.0';
	signedDate: number;
}

export interface SubscribedNotification extends SubscriptionPayload {
	notificationType: 'SUBSCRIBED';
	subtype?: 'INITIAL_BUY' | 'RESUBSCRIBE';
}

export interface DidRenewNotification extends SubscriptionPayload {
	notificationType: 'DID_RENEW';
	subtype?: 'BILLING_RECOVERY';
}

export interface DidChangeRenewalStatusNotification extends SubscriptionPayload {
	notificationType: 'DID_CHANGE_RENEWAL_STATUS';
	subtype?: 'AUTO_RENEW_DISABLED' | 'AUTO_RENEW_ENABLED';
}

export interface DidChangeRenewalPrefNotification extends SubscriptionPayload {
	notificationType: 'DID_CHANGE_RENEWAL_PREF';
	subtype?: 'DOWNGRADE' | 'UPGRADE';
}

export interface DidFailToRenewNotification extends SubscriptionPayload {
	notificationType: 'DID_FAIL_TO_RENEW';
	subtype?: 'GRACE_PERIOD';
}

export interface ExpiredNotification extends SubscriptionPayload {
	notificationType: 'DID_FAIL_TO_RENEW';
	subtype?: 'VOLUNTARY' | 'PRODUCT_NOT_FOR_SALE' | 'BILLING_RETRY';
}

export interface GracePeriodExpiredNotification extends SubscriptionPayload {
	notificationType: 'GRACE_PERIOD_EXPIRED';
}

export interface OfferRedeemedNotification extends SubscriptionPayload {
	notificationType: 'OFFER_REDEEMED';
	subtype?: 'INITIAL_BUY' | 'RESUBSCRIBE' | 'UPGRADE' | 'DOWNGRADE';
}

export interface PriceIncreaseNotification extends SubscriptionPayload {
	notificationType: 'PRICE_INCREASE';
	subtype?: 'PENDING' | 'ACCEPTED';
}

export interface RefundNotification extends SubscriptionPayload {
	notificationType: 'REFUND';
}

export interface RefundReversedNotification extends SubscriptionPayload {
	notificationType: 'REFUND_REVERSED';
}

export interface RefundDeclinedNotification extends SubscriptionPayload {
	notificationType: 'REFUND_DECLINED';
}

export interface RenewalExtendedNotification extends SubscriptionPayload {
	notificationType: 'RENEWAL_EXTENDED';
}

export interface RenewalExtensionNotification extends SubscriptionPayload {
	notificationType: 'RENEWAL_EXTENSION';
	subtype?: 'SUMMARY' | 'FAILURE';
}

export interface RevokeNotification extends SubscriptionPayload {
	notificationType: 'REVOKE';
}

/**
 * https://developer.apple.com/documentation/appstoreservernotifications/notificationtype
 */
export type SubscriptionNotification =
	| SubscribedNotification
	| DidRenewNotification
	| DidChangeRenewalStatusNotification
	| DidChangeRenewalPrefNotification
	| DidFailToRenewNotification
	| ExpiredNotification
	| GracePeriodExpiredNotification
	| OfferRedeemedNotification
	| PriceIncreaseNotification
	| RefundNotification
	| RefundReversedNotification
	| RefundDeclinedNotification
	| RenewalExtendedNotification
	| RenewalExtensionNotification
	| RevokeNotification;

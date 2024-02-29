variable "cloudflare_cms_domain" {
  description = "Public domain name for cms routes"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
}

variable "cloudflare_cms_api_token" {
  description = "Cloudflare API token to make request from the cms app"
  type        = string
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID"
  type        = string
}

variable "github_client_id" {
  description = "Github OAuth app id"
  type        = string
}

variable "github_client_secret" {
  description = "Github OAuth secret token"
  type        = string
}
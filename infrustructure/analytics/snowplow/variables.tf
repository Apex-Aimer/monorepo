variable "prefix" {
  description = "Will be prefixed to all resource names. Use to easily identify the resources created"
  type        = string
}

variable "project_id" {
  description = "The project ID in which the stack is being deployed"
  type        = string
}

variable "region" {
  description = "The name of the region to deploy within"
  type        = string
}

variable "bigquery_loader_dead_letter_bucket_deploy" {
  description = "Whether this module should create a new bucket with the specified name - if the bucket already exists set this to false"
  default     = true
  type        = bool
}

variable "vendor" {
  description = "An unique identifier like 'com.snowplow.analytics for the vendor of this stack."
  type        = string
}

variable "labels" {
  description = "The labels to append to the resources in this module"
  default     = {}
  type        = map(string)
}

variable "collector_domain" {
  description = "Public domain name for collector"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID"
  type        = string
}
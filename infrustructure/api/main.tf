provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_record" "api" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  type    = "A"
  value   = "192.0.2.1"
  proxied = true
}

resource "cloudflare_d1_database" "apexaimer-app-subscriptions" {
  account_id = var.cloudflare_account_id
  name       = "apexaimer-app-subscriptions"
}

resource "cloudflare_worker_script" "apexaimer-app-subscriptions-worker" {
  account_id = var.cloudflare_account_id
  name       = "apexaimer-app-subscriptions-worker"
  content    = file("../../apps/subscriptions/dist/index.js")
  module     = true

  d1_database_binding {
    database_id = cloudflare_d1_database.apexaimer-app-subscriptions.id
    name        = "DB"
  }
}

resource "cloudflare_worker_route" "apexaimer-app-subscriptions" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "api.apexaimer.com/subscriptions/*"
  script_name = cloudflare_worker_script.apexaimer-app-subscriptions-worker.name
}
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

resource "cloudflare_d1_database" "subscriptions" {
  account_id = var.cloudflare_account_id
  name       = "subscriptions-database"
}

resource "cloudflare_worker_script" "subscriptions" {
  account_id = var.cloudflare_account_id
  name       = "subscriptions"
  content    = file("script.js") // TODO

  d1_database_binding {
    database_id = cloudflare_d1_database.database_id
    name        = cloudflare_d1_database.name
  }
}


resource "cloudflare_worker_route" "subscriptions" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "api.apexaimer.com/subscriptions/*"
  script_name = cloudflare_worker_script.subscriptions
}
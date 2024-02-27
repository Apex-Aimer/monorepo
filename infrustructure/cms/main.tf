provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "null" {
  # No configuration is required for the null provider
}

resource "cloudflare_workers_kv_namespace" "apexaimer-cms-kv-ns" {
  account_id = var.cloudflare_account_id
  title      = "apexaimer-cms-kv-ns"
}

locals {
  CMS_R2_NAME      = "apexaimer-cms-r2"
  CMS_PROJECT_NAME = "apexaimer-cms"
  CMS_D1_NAME      = "apexaimer-cms-db"
}

resource "cloudflare_d1_database" "apexaimer-cms-db" {
  account_id = var.cloudflare_account_id
  name       = local.CMS_D1_NAME
}

resource "cloudflare_r2_bucket" "apexaimer-cms-r2" {
  account_id = var.cloudflare_account_id
  name       = local.CMS_R2_NAME
  # location   = "weur"
}

resource "cloudflare_pages_project" "apexaimer-cms" {
  account_id        = var.cloudflare_account_id
  name              = local.CMS_PROJECT_NAME
  production_branch = "main"

  build_config {
    build_command       = "npm run build"
    root_dir            = "apps/cms"
  }

  source {
    type = "github"

    config {
      owner                         = "Apex-Aimer"
      repo_name                     = "monorepo"
      production_branch             = "main"
      deployments_enabled           = false
      production_deployment_enabled = false
      preview_deployment_setting    = "none"
      pr_comments_enabled           = false
    }
  }

  deployment_configs {
    production {
      environment_variables = {
        ENVIRONMENT = "production"
        NODE_VERSION = "16"
      }
      kv_namespaces = {
        KVDATA = cloudflare_workers_kv_namespace.apexaimer-cms-kv-ns.id
      }
      r2_buckets = {
        R2STORAGE = local.CMS_R2_NAME
      }
      d1_databases = {
        D1DATA = cloudflare_d1_database.apexaimer-cms-db.id
      }
    }
  }
}

resource "null_resource" "deploy" {
  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    command = "cd ../../apps/cms && envsubst < wrangler.template.toml > wrangler.toml && yarn build && yarn up:prod && yarn deploy --project-name $PROJECT_NAME"

    environment = {
      PROJECT_NAME = local.CMS_PROJECT_NAME
      CLOUDFLARE_ACCOUNT_ID = var.cloudflare_account_id
      PROJECT_KV_ID = cloudflare_workers_kv_namespace.apexaimer-cms-kv-ns.id
      PROJECT_D1_NAME = local.CMS_D1_NAME
      PROJECT_D1_ID = cloudflare_d1_database.apexaimer-cms-db.id
      PROJECT_R2_NAME = local.CMS_R2_NAME
    }
  }
}

resource "cloudflare_pages_domain" "apexaimer-cms-domain" {
  account_id   = var.cloudflare_account_id
  project_name = local.CMS_PROJECT_NAME
  domain       = var.cloudflare_cms_domain
}

resource "cloudflare_record" "cms" {
  zone_id = var.cloudflare_zone_id
  name    = "cms"
  type    = "CNAME"
  value   = cloudflare_pages_project.apexaimer-cms.domains[0]
  proxied = true
}
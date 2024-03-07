# How to setup

1. Prepare the build `terraform init`
2. Apply changes `terraform apply --auto-approve`

Custom domain for R2 bucket is not automated (due to lack of such API),
so you need to:

- login to the `dash.cloudflare.com`
- select R2 instance for the cms
- go to `Settings`
- apply `media.apexaimer.com` custom domain for the bucket
- review CORS policy

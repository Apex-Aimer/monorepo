# How to setup

1. Bundle the worker in `apps/subscriptions`, with `cd apps/subscriptions && yarn bundle`
2. Prepare the build `terraform init`
3. Apply changes `terraform apply --auto-approve`
4. Check that created by default route is enabled
5. If the table from `apps/subscriptions/setup.sql` isn't created in D1 instance, execute the script in the web dashboard to create the database

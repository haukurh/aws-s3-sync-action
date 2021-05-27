# AWS S3 sync action

A GitHub Action that runs AWS S3 sync command, saves the output in order to use it later on.

## Prerequisite

In order to use this action, AWS credentials need to be configured. See 
[Configure AWS Credentials](https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions) 
on the marketplace for more.

```yaml
jobs:
  deploy:
    name: Sync to S3
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
```

## Inputs

This action has four inputs which can be used to customize the sync.

| Name      | Description                           | Required | Default |
|-----------|---------------------------------------|----------|---------|
| directory | Directory to sync                     | false    | dist/   |
| s3-bucket | S3 bucket to sync to                  | true     |         |
| s3-path   | S3 path                               | false    | /       |
| args      | Additional arguments for sync command | false    | (empty) |

## Outputs

This action has only one output and that's the output from the AWS CLI sync command. 

| Name   | Description                |
|--------|----------------------------|
| stdout | Output of the sync command |

Example:
```shell
upload: file1 to s3://my-bucket/file1
upload: file2 to s3://my-bucket/file2
```

## Usage

Create a step that uses this function

```yaml
      - name: Sync directory to S3
        id: s3_sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          directory: dist/
          s3-bucket: ${{ secrets.AWS_S3_BUCKET }}
```

With additional arguments...

```yaml
      - name: Sync directory to S3
        id: s3_sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          directory: dist/
          s3-bucket: ${{ secrets.AWS_S3_BUCKET }}
          args: --size-only --delete
```

### Get output

```yaml
    steps:
      - name: Sync directory to S3
        id: s3_sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          directory: dist/
          s3-bucket: ${{ secrets.AWS_S3_BUCKET }}
      - name: Work with output
        run: echo ${{ steps.s3-sync.outputs.stdout }}
```

### More complete example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1

      - name: Sync directory to S3
        id: s3_sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          directory: dist/
          s3-bucket: ${{ secrets.AWS_S3_BUCKET }}
```

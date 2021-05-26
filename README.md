# AWS S3 sync action

A Github Action that runs AWS S3 sync command, saves the output in order to use it later on.

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

## Usage

Create a step that uses this function

```yaml
      - name: Sync to S3
        id: s3-sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          source: dist/
          destination: ${{ secrets.AWS_S3_BUCKET }}
```

With additional arguments...

```yaml
      - name: Sync to S3
        id: s3-sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          source: dist/
          destination: ${{ secrets.AWS_S3_BUCKET }}
          args: --size-only --delete
```

## Get output

```yaml
    steps:
      - name: Sync to S3
        id: s3-sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          source: dist/
          destination: ${{ secrets.AWS_S3_BUCKET }}
      - name: Work with output
        run: echo ${{ steps.s3-sync.outputs.stdout }}
```

## More complete example

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

      - name: Sync to S3
        id: s3-sync
        uses: haukurh/aws-s3-sync-action@v1
        with:
          source: dist/
          destination: ${{ secrets.AWS_S3_BUCKET }}
          args: --size-only --delete

      - name: Work with output
        run: echo ${{ steps.s3-sync.outputs.stdout }}
```

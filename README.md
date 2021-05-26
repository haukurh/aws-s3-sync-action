# AWS S3 sync action

A Github Action that runs AWS S3 sync command, saves the output in order to use it later on.

## Usage

```yaml
      - name: Configure AWS credentials
        uses: haukurh/aws-s3-sync-action@v1
        with:
          source: dist/
          destination: ${{ secrets.AWS_S3_BUCKET }}
```

With additional arguments...

```yaml
      - name: Configure AWS credentials
        uses: haukurh/aws-s3-sync-action@v1
        with:
          source: dist/
          destination: ${{ secrets.AWS_S3_BUCKET }}
          args: --size-only --delete
```

# nodeWatermark

```
path ./assets - using to watermark
path ./src - you image
path ./result - watermark image
```

## plz change watermark name

```javascript
.composite(
  [
    {
      input: './assets/watermark_small.png',
      top: 512 - 40,
      left: 10,
    },
    {
      input: './assets/watermark_big.png',
      top: (512 / 2) - (300 / 2),
      left: (512 / 2) - (300 / 2),
    },
  ]
)
```
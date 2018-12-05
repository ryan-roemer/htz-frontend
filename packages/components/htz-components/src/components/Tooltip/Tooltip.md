## Simple implmentation

```jsx
<div style={{ margin: '200px 0 0 300px' }}>
  <Tooltip text="What is up?">
    <p style={{ margin: '0px', display: 'inline-block' }}>goodby</p>
  </Tooltip>
</div>
```

## Openning side

Forcing the tooltip openning side. Sccepts : TOP | BOTTOM | LEFT | RIHGT | AUTO (default)

```jsx
<div style={{ margin: '100px 0 0 300px' }}>
  <Tooltip text="What is up?" openSide="RIGHT">
    <p style={{ margin: '0px', display: 'inline-block' }}>goodby</p>
  </Tooltip>
</div>
```

## Custom Box Offset (in rem)

```jsx
<div style={{ margin: '100px 0 0 300px' }}>
  <Tooltip text="What is up?" openSide="RIGHT" offsetX="2" offsetY="1.5">
    <p style={{ margin: '0px', display: 'inline-block' }}>goodby</p>
  </Tooltip>
</div>
```

## Show on mouse events

```jsx
<div style={{ margin: '100px 0 0 300px' }}>
  <Tooltip text="What is up?" openOnMouseOver offsetX="2" offsetY="1.5">
    <p style={{ margin: '0px', display: 'inline-block' }}>goodby</p>
  </Tooltip>
</div>
```

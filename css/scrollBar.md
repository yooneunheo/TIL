```css
::-webkit-scrollbar {
  bottom: 0;
  height: 5px; // 8px
  width: 8px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid transparent;
}
&:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
}
```

<script lang="ts">
export default {};
</script>

<template>
  <footer>
    <div id="d1">
      <a href="/impressum.html">Impressum</a>
      <a href="/datenschutz.html">Datenschutz</a>
    </div>
    <div dir="d2">
      <a href="/">Startseite</a>
      <a href="/search.html">Suche</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: #121212;
  gap: 14px;
}

footer * {
  font-family: 'Ubuntu_Mono';
  text-decoration: none;
}

footer div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
}

footer div#d1 {
  align-items: flex-end;
}

footer div#d2 {
  align-items: flex-start;
}

footer div a {
  color: #e2e2e2;
}

footer div a:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
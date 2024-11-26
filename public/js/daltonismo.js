document.addEventListener('DOMContentLoaded', () => {
  const colorBlind = require('color-blind');  
  const daltonismoBtn = document.getElementById('toggle-color');
  const colorMode = document.getElementById('color-mode');
  const resetColorBtn = document.getElementById('reset-color');
  const originalStyles = new Map();

  const saveOriginalStyles = (rule) => {
    if (!originalStyles.has(rule)) {
      originalStyles.set(rule, {
        backgroundColor: rule.style.backgroundColor,
        color: rule.style.color,
        background: rule.style.background,
      });
    }
  };
  
  daltonismoBtn.addEventListener('click', () => {
    selectedMode = colorMode.value;
    const styleSheets = document.styleSheets;

    for (const sheet of styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.style) {
            saveOriginalStyles(rule);
            const originalColor = originalStyles.get(rule);
            if (rule.style.backgroundColor) {
              const adjustedBgColor = colorBlind[selectedMode](originalColor.backgroundColor);
              rule.style.backgroundColor = adjustedBgColor;
            }

            if (rule.style.color) {
              const adjustedTextColor = colorBlind[selectedMode](originalColor.color);
              rule.style.color = adjustedTextColor;
            }

            if (rule.style.background) {
              const bgColors = originalColor.background;
              const colorRegex = /#([0-9a-fA-F]{3,6})|rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/g;
              const adjustedBg = bgColors.replace(colorRegex, (color) => {
                return colorBlind[selectedMode](color);
              });
              // const adjustedBg = colorBlind[selectedMode](originalColor.background);
              rule.style.background = adjustedBg;
            }
          }
        }
      } catch (err) {
        console.warn(`No se pudo acceder a una regla de estilo: ${err}`);
      }
    }
    daltonismoBtn.textContent = `Modo ${selectedMode} Activado`;
  });


  resetColorBtn.addEventListener('click', () => {
    for (const [rule, styles] of originalStyles.entries()) {
      if (styles.backgroundColor) rule.style.backgroundColor = styles.backgroundColor;
      if (styles.color) rule.style.color = styles.color;
      if (styles.background) rule.style.background = styles.background;
    }
    daltonismoBtn.textContent = "Activar Daltonismo";
  });

});

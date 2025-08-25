'use client';

import { useEffect } from 'react';

export default function ForceBlocklyStyles() {
  useEffect(() => {
    // Create and inject minimal professional CSS
    const styleId = 'force-blockly-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      /* STYLE MINIMALISTE AVEC COULEURS PROFESSIONNELLES */
      div[class*="blocklyTreeRow"],
      div.blocklyTreeRow,
      div[class*="blocklyToolboxCategory"],
      .blocklyTreeRow,
      .blocklyToolboxCategory,
      [class*="blocklyTreeRow"] {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
        color: #475569 !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 8px !important;
        margin: 2px 3px !important;
        padding: 8px 12px !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
        display: flex !important;
        align-items: center !important;
      }

      /* Couleurs professionnelles par bouton */
      div[class*="blocklyTreeRow"]:nth-child(1),
      div.blocklyTreeRow:nth-child(1) {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%) !important;
        border-color: #93c5fd !important;
        color: #1e40af !important;
      }

      div[class*="blocklyTreeRow"]:nth-child(2),
      div.blocklyTreeRow:nth-child(2) {
        background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%) !important;
        border-color: #c4b5fd !important;
        color: #7c3aed !important;
      }

      div[class*="blocklyTreeRow"]:nth-child(3),
      div.blocklyTreeRow:nth-child(3) {
        background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%) !important;
        border-color: #86efac !important;
        color: #059669 !important;
      }

      div[class*="blocklyTreeRow"]:nth-child(4),
      div.blocklyTreeRow:nth-child(4) {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
        border-color: #fcd34d !important;
        color: #d97706 !important;
      }

      /* Effets hover colorés */
      div[class*="blocklyTreeRow"]:hover,
      div.blocklyTreeRow:hover,
      div[class*="blocklyToolboxCategory"]:hover,
      .blocklyTreeRow:hover,
      .blocklyToolboxCategory:hover,
      [class*="blocklyTreeRow"]:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
      }

      div[class*="blocklyTreeRow"]:nth-child(1):hover,
      div.blocklyTreeRow:nth-child(1):hover {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
        color: white !important;
      }

      div[class*="blocklyTreeRow"]:nth-child(2):hover,
      div.blocklyTreeRow:nth-child(2):hover {
        background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%) !important;
        color: white !important;
      }

      div[class*="blocklyTreeRow"]:nth-child(3):hover,
      div.blocklyTreeRow:nth-child(3):hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
        color: white !important;
      }

      div[class*="blocklyTreeRowSelected"],
      div.blocklyTreeRowSelected,
      div[class*="blocklyToolboxCategory"].blocklyTreeRowSelected,
      .blocklyTreeRowSelected,
      .blocklyToolboxCategory.blocklyTreeRowSelected,
      [class*="blocklyTreeRowSelected"] {
        transform: translateY(0) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }

      /* Texte professionnel coloré */
      div[class*="blocklyTreeRow"] span,
      div[class*="blocklyTreeRow"] .blocklyTreeLabel,
      div.blocklyTreeRow span,
      div.blocklyTreeRow .blocklyTreeLabel,
      .blocklyTreeRow span,
      .blocklyTreeRow .blocklyTreeLabel,
      [class*="blocklyTreeLabel"],
      .blocklyTreeLabel {
        color: inherit !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 13px !important;
        font-weight: 500 !important;
      }

      /* SVG text elements colorés */
      .blocklyToolboxDiv text,
      .blocklyToolboxDiv .blocklyText {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-weight: 500 !important;
        font-size: 13px !important;
      }

      .blocklyTreeRowSelected text,
      .blocklyTreeRowSelected .blocklyText,
      .blocklyTreeRow:hover text,
      .blocklyTreeRow:hover .blocklyText {
        fill: white !important;
      }

      /* Toolbox container minimal */
      .blocklyToolboxDiv {
        background: #fafafa !important;
        border-right: 1px solid #e0e0e0 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      }
      
      .blocklyToolboxContents {
        padding: 6px !important;
      }
    `;

    document.head.appendChild(style);

    // Application programmatique avec couleurs
    let attempts = 0;
    const maxAttempts = 8;
    
    // Couleurs professionnelles pour chaque bouton
    const professionalColors = [
      { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '#93c5fd', color: '#1e40af', hoverBg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '#c4b5fd', color: '#7c3aed', hoverBg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '#86efac', color: '#059669', hoverBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#fcd34d', color: '#d97706', hoverBg: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', border: '#f87171', color: '#dc2626', hoverBg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)', border: '#67b7dc', color: '#0369a1', hoverBg: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '#86efac', color: '#16a34a', hoverBg: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #fdf4ff 0%, #f5e6ff 100%)', border: '#d8b4fe', color: '#9333ea', hoverBg: 'linear-gradient(135deg, #9333ea 0%, #7c2d12 100%)', hoverColor: 'white' },
      { bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)', border: '#fdba74', color: '#ea580c', hoverBg: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', hoverColor: 'white' }
    ];
    
    const applyStylesInterval = setInterval(() => {
      attempts++;
      
      const selectors = [
        '.blocklyTreeRow',
        '.blocklyToolboxCategory', 
        'div[class*="blocklyTreeRow"]',
        'div[class*="blocklyToolboxCategory"]',
        '[role="treeitem"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
          // Couleurs cycliques professionnelles
          const colorScheme = professionalColors[index % professionalColors.length];
          
          el.style.cssText += `
            background: ${colorScheme.bg} !important;
            color: ${colorScheme.color} !important;
            border: 1px solid ${colorScheme.border} !important;
            border-radius: 8px !important;
            margin: 2px 3px !important;
            padding: 8px 12px !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
          `;
          
          // Texte coloré professionnel
          const textElements = el.querySelectorAll('span, .blocklyTreeLabel, text');
          textElements.forEach(textEl => {
            textEl.style.cssText += `
              color: ${colorScheme.color} !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
              font-size: 13px !important;
              font-weight: 500 !important;
            `;
            if (textEl.tagName === 'text') {
              textEl.setAttribute('fill', colorScheme.color);
            }
          });

          // Effets hover
          el.addEventListener('mouseenter', () => {
            el.style.background = colorScheme.hoverBg;
            el.style.color = colorScheme.hoverColor;
            el.style.transform = 'translateY(-1px)';
            el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            
            textElements.forEach(textEl => {
              textEl.style.color = colorScheme.hoverColor;
              if (textEl.tagName === 'text') {
                textEl.setAttribute('fill', colorScheme.hoverColor);
              }
            });
          });

          el.addEventListener('mouseleave', () => {
            el.style.background = colorScheme.bg;
            el.style.color = colorScheme.color;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            
            textElements.forEach(textEl => {
              textEl.style.color = colorScheme.color;
              if (textEl.tagName === 'text') {
                textEl.setAttribute('fill', colorScheme.color);
              }
            });
          });
        });
      });

      if (attempts >= maxAttempts) {
        clearInterval(applyStylesInterval);
        console.log('Style coloré professionnel appliqué');
      }
    }, 250);

    return () => {
      if (applyStylesInterval) {
        clearInterval(applyStylesInterval);
      }
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
}

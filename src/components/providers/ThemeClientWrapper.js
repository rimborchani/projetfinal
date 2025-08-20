'use client';

import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import { useEffect } from 'react';

// Helper component to force-refresh Blockly styling when theme changes.
function BlocklyThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    // Runtime Color Enforcement - apply inline styles to category containers, rows, and labels when theme changes
    const enforceBlocklyColors = () => {
      const toolbox = document.querySelector('.blocklyToolboxDiv');
      if (!toolbox) return;
      
      const isDark = document.documentElement.classList.contains('dark');
      
      // 1. Enhanced Category Styling - explicit background colors and text colors for .blocklyToolboxCategory
      toolbox.querySelectorAll('.blocklyToolboxCategory').forEach(category => {
        category.style.backgroundColor = isDark ? '#1e293b' : '#ffffff';
        category.style.color = isDark ? '#f1f5f9' : '#1e293b';
        category.style.border = `1px solid ${isDark ? '#334155' : '#e2e8f0'}`;
        category.style.padding = '12px 16px';
        category.style.margin = '4px 8px';
        category.style.borderRadius = '8px';
        category.style.cursor = 'pointer';
        category.style.transition = 'all 0.2s ease';
      });
      
      // 2. Improved Tree Row Styling - background colors for .blocklyTreeRow elements
      toolbox.querySelectorAll('.blocklyTreeRow').forEach(row => {
        const isSelected = row.classList.contains('blocklyTreeRowSelected');
        
        if (isSelected) {
          row.style.backgroundColor = '#3b82f6';
          row.style.color = '#ffffff';
          row.style.borderColor = isDark ? '#60a5fa' : '#2563eb';
        } else {
          row.style.backgroundColor = isDark ? '#1e293b' : '#ffffff';
          row.style.color = isDark ? '#f1f5f9' : '#1e293b';
          row.style.borderColor = isDark ? '#334155' : '#e2e8f0';
        }
        
        row.style.border = '1px solid';
        row.style.padding = '12px 16px';
        row.style.margin = '4px 8px';
        row.style.borderRadius = '8px';
        row.style.cursor = 'pointer';
        row.style.transition = 'all 0.2s ease';
      });
      
      // 3. Stronger Tree Label Colors - explicit colors with !important to override Blockly's inline styles
      toolbox.querySelectorAll('.blocklyTreeLabel').forEach(label => {
        const row = label.closest('.blocklyTreeRow');
        const isSelected = row?.classList.contains('blocklyTreeRowSelected');
        
        // Force white text for all labels to ensure visibility on colored backgrounds
        label.style.color = '#ffffff';
        label.style.fontWeight = isSelected ? '700' : '600';
        label.style.fontSize = '14px';
        label.style.letterSpacing = '0.5px';
        label.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        label.style.userSelect = 'none';
        label.style.textShadow = '0 1px 2px rgba(0,0,0,0.8)';
      });
      
      // Style main toolbox container
      toolbox.style.backgroundColor = isDark ? '#0f172a' : '#f8fafc';
      toolbox.style.borderRightColor = isDark ? '#334155' : '#e2e8f0';
      toolbox.style.color = isDark ? '#f1f5f9' : '#1e293b';
      toolbox.style.width = '220px';
    };

    // Apply immediately and after delays to catch async Blockly rendering
    enforceBlocklyColors();
    const t1 = setTimeout(enforceBlocklyColors, 50);
    const t2 = setTimeout(enforceBlocklyColors, 300);
    const t3 = setTimeout(enforceBlocklyColors, 1000);

    // Monitor for toolbox changes and reapply styling
    const observer = new MutationObserver(() => {
      setTimeout(enforceBlocklyColors, 10);
    });
    
    const toolboxEl = document.querySelector('.blocklyToolboxDiv');
    if (toolboxEl) {
      observer.observe(toolboxEl, { 
        childList: true, 
        subtree: true, 
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }
    
    return () => {
      clearTimeout(t1); 
      clearTimeout(t2); 
      clearTimeout(t3);
      observer.disconnect();
    };
  }, [theme]);

  return null;
}

export default function ThemeClientWrapper({ children }) {
  return (
    <ThemeProvider>
      <div className="fixed top-3 right-3 z-[1001]">
        <ThemeToggle />
      </div>
  <BlocklyThemeSync />
      {children}
    </ThemeProvider>
  );
}

/** @format */

import React from 'react';
import {
  ColorGradient,
  ColorGradientChangeEvent,
} from '@progress/kendo-react-inputs';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

function ThemConfigure({ value, setValue, setTextColor, setThemeModel }: any) {
  const calculateBrightness = (rgba: string) => {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (!match) return 0;

    const [, r, g, b] = match.map(Number);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const adjustForVisibility = (rgba: string) => {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (!match) return rgba;
    const [, r, g, b] = match.map(Number);
    const brightness = calculateBrightness(rgba);
    if (brightness > 0.8) {
      return `rgba(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(
        b - 50,
        0
      )}, 1)`;
    }

    return rgba;
  };

  const handleOnChange = (event: ColorGradientChangeEvent) => {
    const newValue = event.value;
    setValue(newValue);
    const brightness = calculateBrightness(newValue);
    setTextColor(brightness > 0.7 ? '#000000' : '#ffffff');
    const adjustedPrimary = adjustForVisibility(newValue);
    setValue(adjustedPrimary);
  };

  return (
    <div>
      <Dialog
        onClose={() => {
          setThemeModel(false);
        }}
        width={380}
        height={700}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          width: '100%',
        }}
        title='Theme Settings'
      >
        <div style={{ padding: '20px' }}>
          {/* Title Section */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h2 style={{ margin: 0 }}>Customize Theme Colors</h2>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              Adjust the theme colors to suit your preferences.
            </p>
          </div>

          {/* Color Gradient Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <ColorGradient value={value} onChange={handleOnChange} />
          </div>

          {/* Preview Section */}
          <div
            style={{
              textAlign: 'center',
              padding: '10px',
              backgroundColor: value,
              color: calculateBrightness(value) > 0.7 ? '#000' : '#fff',
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: 0 }}>Preview</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{value}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogActionsBar>
          <Button themeColor='primary'>Save</Button>
          <Button
            onClick={() => {
              setThemeModel(false);
            }}
            themeColor='base'
          >
            Cancel
          </Button>
        </DialogActionsBar>
      </Dialog>
    </div>
  );
}

export default ThemConfigure;

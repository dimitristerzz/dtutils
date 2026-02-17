type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };
type ColorInput = string | RGB;
type ColorFormat = 'hex' | 'rgb' | 'hsl';

/**
 * Converts a color between formats (hex, RGB, HSL).
 * Supports input as hex string (e.g. "#FF0000" or "FF0000"),
 * RGB object ({ r, g, b }), or comma-separated RGB string ("255,0,0").
 * 
 * @param input The color input (hex string, RGB object, or comma-separated RGB string)
 * @param to The target format: 'hex', 'rgb', or 'hsl'
 * @returns The color in the requested format, or null if input is invalid
 */
export function formatColor(input: ColorInput, to: ColorFormat): string | RGB | HSL | null {
  // --- Helper functions ---

  /**
   * Converts a hex color string to an RGB object.
   * @param hex Hex color string (with or without "#")
   * @returns RGB object or null if invalid
   */
  const hexToRgb = (hex: string): RGB | null => {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    if (hex.length !== 6) return null;

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  };

  /**
   * Converts an RGB object to a hex color string.
   * @param rgb RGB object
   * @returns Hex color string (uppercase, with "#")
   */
  const rgbToHex = ({ r, g, b }: RGB): string => {
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  /**
   * Converts an RGB object to an HSL object.
   * @param rgb RGB object
   * @returns HSL object with h (0-360), s (0-100), l (0-100)
   */
  const rgbToHsl = ({ r, g, b }: RGB): HSL => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    const d = max - min;
    if (d !== 0) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
  };

  // --- Convert input to RGB as internal standard ---
  let rgb: RGB | null = null;

  if (typeof input === "string") {
    // check if it's comma-separated RGB
    if (/^\d{1,3},\d{1,3},\d{1,3}$/.test(input.trim())) {
      const [r, g, b] = input.split(',').map(Number);
      if ([r, g, b].some(n => n < 0 || n > 255 || isNaN(n))) return null;
      rgb = { r, g, b };
    } else {
      // assume it's hex
      rgb = hexToRgb(input);
    }
    if (!rgb) return null;
  } else if ('r' in input && 'g' in input && 'b' in input) {
    rgb = input;
  } else {
    return null; // unsupported input
  }

  // --- Convert from RGB to requested output ---
  switch (to) {
    case 'hex':
      return rgbToHex(rgb);
    case 'rgb':
      return rgb;
    case 'hsl':
      return rgbToHsl(rgb);
    default:
      return null; // unsupported output
  }
}
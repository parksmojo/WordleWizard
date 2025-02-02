interface Color {
  hex: string;
  next: string;
  filterMethod: (word: string, char: string, pos: number) => boolean;
}

export class Colors {
  public static readonly black = 'b';
  public static readonly yellow = 'y';
  public static readonly green = 'g';
  public static readonly orange = 'o';

  public static get(colorCode: string): Color {
    return this.dataOf[colorCode];
  }

  private static readonly dataOf: Record<string, Color> = {
    [this.black]: {
      hex: '#3a3a3c',
      next: this.yellow,
      filterMethod: (word: string, char: string) => !word.includes(char),
    },
    [this.yellow]: {
      hex: '#b59f3b',
      next: this.green,
      filterMethod: (word: string, char: string, pos: number) =>
        word.includes(char) && word[pos] !== char,
    },
    [this.green]: {
      hex: '#538d4e',
      next: this.black,
      filterMethod: (word: string, char: string, pos: number) =>
        word[pos] === char,
    },
    [this.orange]: {
      hex: '#ff8c00',
      next: this.orange,
      filterMethod: (word: string, char: string) => word.includes(char),
    },
  };
}


//artificial async counter API


class CounterAPI {
  private value: number;
  private minValue: number; //some artificial min on the value of the counter
  private maxValue: number; //some artificial cap on the value of the counter
  private DELAY = 1000;

  get currentValue() { return this.value; }

  constructor(initialValue = 0, minValue = 0, maxValue = 5) {
    this.value = initialValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  async increment() {
    return await this.change(1);
  }

  async decrement() {
    return await this.change(-1);
  }

  async change(amt: number): Promise<number> {
    return await (new Promise((resolve, reject) => {
      setTimeout(() => {
        const newValue = this.value + amt;
        if (newValue < this.minValue) {
          reject(`Change to the counter value would subceed the min value (${this.minValue})`);
        }
        else if (newValue > this.maxValue) {
          reject(`Change to the counter value would exceed the max value (${this.maxValue})`);
        }
        else {
          this.value = newValue;
          resolve(newValue);
        }
      }, this.DELAY);
    }));
  }


  
}

export const counterAPI = new CounterAPI();
import { Injectable } from '@angular/core';
import { DinerBase } from '../shared/model/dinerBase';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DinersService {
  randomNames: string[] = [
    'Nora',
    'Alyson',
    'Tracey ',
    'Jake',
    'Susan',
    'Regina',
    'Louise',
    'Stefan',
    'Bethany',
    'Josephine',
    'Arthur',
    'Bruce',
    'Elle',
    'Ernest',
    'Katie',
    'Mildred',
    'Jonathan',
    'Marcus',
    'Tamara',
    'Sarah-Jane',
    'Winston',
    'Kelly',
    'Denis',
    'Walter',
    'Sara',
    'Celia',
    'Val',
    'Derek',
    'Vijay',
    'Paul ',
    'Kevin',
    'Victor',
    'Samantha',
    'Catriona',
    'Rhys',
    'Juliette',
    'Mitchell',
    'Brett',
    'Katy',
    'Monique',
    'Antoinette',
    'Alicia',
    'Darrell',
    'Norah',
    'Alex',
    'Sunil',
    'Ursula',
    'Wend',
    'Tomas',
    'Dennis',
    'Paola',
    'Nikia',
    'Anusha',
    'Clare',
    'Toni',
    'Branson',
    'Conor',
  ];

  defaultDiners: DinerBase[] = [
    {
      key: Math.floor(Math.random() * 100),
      name: '',
      amount: 50.0,
      order: 1,
      locked: false,
    },
    {
      key: Math.floor(Math.random() * 100),
      name: '',
      amount: 50.0,
      order: 2,
      locked: false,
    },
    {
      key: Math.floor(Math.random() * 100),
      name: '',
      amount: 50.0,
      order: 3,
      locked: false,
    },
    {
      key: Math.floor(Math.random() * 100),
      name: '',
      amount: 50.0,
      order: 4,
      locked: false,
    },
    {
      key: Math.floor(Math.random() * 100),
      name: '',
      amount: 50.0,
      order: 5,
      locked: false,
    },
    {
      key: Math.floor(Math.random() * 100),
      name: '',
      amount: 50.0,
      order: 6,
      locked: false,
    },
  ];

  getDefaultDiners() {
    return of(this.defaultDiners.sort((a, b) => a.order - b.order));
  }

  public getTotal(diners: DinerBase[], lockedStatus: boolean | null = null) {
    if (lockedStatus != null)
      return diners
        .filter((x) => x.locked == lockedStatus)
        .reduce(
          (accumulator, currentItem) =>
            accumulator + Number(currentItem.amount),
          0
        );
    else
      return diners?.reduce(
        (accumulator, currentItem) => accumulator + Number(currentItem.amount),
        0
      );
  }

  divideAmount(diners: DinerBase[], divideAmount: number) {
    console.log(diners);
    console.log(divideAmount);
    const countUnLockedDiners =
      diners.filter((x) => x.locked === false).length || 1;
    const countTotalLockedDiners = this.getTotal(diners, true);
    const amountToDivide: number = divideAmount - countTotalLockedDiners;
    const avgPerDiner = Math.round(((amountToDivide) / countUnLockedDiners) * 100) / 100;

    diners.forEach((diner) => {
      if (!diner.locked) diner.amount = avgPerDiner;
    });

    //add variance
    const variance =
      Math.round(
        (divideAmount - (countTotalLockedDiners + (countUnLockedDiners* avgPerDiner))) * 100
      ) / 100;

      if (variance !== 0)
      {
        //find first diner that is not locked
        const firstUnlockedDiner = diners.findIndex(x => x.locked !== true);
        console.log('firstUnlockedDiner =' + firstUnlockedDiner);
        console.log(firstUnlockedDiner);
        diners[firstUnlockedDiner].amount = Math.round((diners[firstUnlockedDiner].amount + variance) * 100) / 100;
      }
  }

  setRandomNames(diners: DinerBase[]) {
    for (let diner of diners) {
      let pos = Math.floor(Math.random() * (50 - 1) + 1);
      diner.name = this.randomNames[pos];
    }
  }
  getRandomName() {
      let pos = Math.floor(Math.random() * (50 - 1) + 1);
      return(this.randomNames[pos]);
  }
}

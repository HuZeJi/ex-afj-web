import { Injectable } from '@angular/core';
import { Movement } from './classes/movement';
import { IMonthCard } from './interfaces/IMonthCard';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor() {}

  public getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber];
  }

  public getMonthNumber(monthName: string): number {
    return this.monthNames.findIndex((e) => e === monthName);
  }

  public calculateAmountByMonth(movements: any[]): any[] {
    const movementsByDates: any[] = movements.map((e) => {
      const movementDate = new Date(e.createdDate);
      let tempDate = new Date();
      tempDate.setMonth(movementDate.getMonth());
      tempDate.setFullYear(movementDate.getFullYear());
      return tempDate;
    });

    const movementsReduced = movementsByDates.filter((elem, index, self) => {
      return (
        index ===
        self.indexOf(
          self.find(
            (e) =>
              new Date(e).getMonth() === new Date(elem).getMonth() &&
              new Date(e).getFullYear() === new Date(elem).getFullYear()
          )
        )
      );
    });

    return movementsReduced.map((m) => {
      const createdDate = new Date(m);
      return {
        expenses: this.getAmountByTypeAndDate(movements, m, 0),
        incomes: this.getAmountByTypeAndDate(movements, m, 1),
        month: this.getMonthName(createdDate.getMonth()),
        year: createdDate.getFullYear(),
      };
    });
    // console.log(movementsMonth);
  }

  private getAmountByTypeAndDate(
    movements: any[],
    date: Date,
    transactionType: number
  ): number {
    const movementsWithValidAmountMap = movements.map((movement) =>
      new Date(date).getMonth() === new Date(movement.createdDate).getMonth() &&
      new Date(date).getFullYear() ===
        new Date(movement.createdDate).getFullYear() &&
      movement.transactionType === transactionType
        ? movement.amount
        : null
    );
    const movementsWithValidAmount = movementsWithValidAmountMap.filter(
      (amount) => amount !== null
    );
    return movementsWithValidAmount.length > 0
      ? movementsWithValidAmount.reduce((acc, amount) => acc + amount)
      : 0;
  }

  public getMovementsByTransaction(
    movements: Movement[],
    transactionType: number,
    month: number,
    year: number
  ): any[] {
    const movementsTransactionFilter = movements.map((movement) => {
      return movement.transactionType === transactionType &&
        new Date(movement.createdDate).getMonth() === month &&
        new Date(movement.createdDate).getFullYear() === year
        ? movement
        : null;
    });
    return movementsTransactionFilter.filter((movement) => movement !== null);
  }

  public getMovementsByTransactionType(
    movements: Movement[],
    transactionType: number
  ): any[] {
    const movementsTransactionFilter = movements.map((movement) => {
      return movement.transactionType === transactionType ? movement : null;
    });
    return movementsTransactionFilter.filter((movement) => movement !== null);
  }

  public getTotalByArray(movements: Movement[]): number {
    const movementsTotal = movements.map((movement) => movement.amount);
    return movementsTotal.length > 0
      ? movementsTotal.reduce((acc, amount) => acc + amount)
      : 0;
  }
}

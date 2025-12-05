import { formatShortDate, formatAmountWithSign } from '../utils/formatters.js';

export class TransactionCard {
  constructor(transaction) {
    this.transaction = transaction;
  }

  render() {
    const { date, description, categoryName, amount } = this.transaction;
    const amountClass = amount >= 0 ? 'positive' : '';
    
    return `
      <tr>
        <td class="date-col">${formatShortDate(date)}</td>
        <td class="desc-col">${description}</td>
        <td class="cat-col"><span class="badge">${categoryName}</span></td>
        <td class="amount-col ${amountClass}">${formatAmountWithSign(amount)}</td>
      </tr>
    `;
  }

  static renderList(transactions) {
    if (!transactions || transactions.length === 0) {
      return '<tr><td colspan="4" style="text-align: center; padding: 20px;">Нет транзакций</td></tr>';
    }
    
    return transactions.map(t => new TransactionCard(t).render()).join('');
  }
}


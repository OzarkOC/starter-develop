window.Webflow ||= [];
window.Webflow.push(() => {
  const form = document.querySelector<HTMLFormElement>('[sc-element="form"]');

  const resultInterest = document.querySelectorAll('[sc-element="result-interest"]');
  const resultTotal = document.querySelectorAll('[sc-element="result-total"]');
  const resultMonthly = document.querySelectorAll('[sc-element="result-monthly"]');
  const resultLoan = document.querySelectorAll('[sc-element="result-loan]');
  if (!form || !resultLoan || !resultInterest || !resultTotal || !resultMonthly) return;

  // Listen for form submission events
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // doesn't count webflow form submission
    e.stopPropagation(); //prevent webflow's JS listners

    //Get Data
    const formData = new FormData(form);
    const amount = formData.get('amount');
    const interest = formData.get('interest');
    const term = formData.get('term');

    if (!amount || !interest || !term) return;
    // perform any maths
    // Loan = Amount x interest/100(for percentage) x Time
    const intotal = Number(amount) * (Number(interest) / 100) * Number(term);
    const total = Number(amount) + intotal;
    const monthlyPayment = total / 12;
    const monthlyInterest = (Number(amount) * Number(interest)) / 12;

    //display results
    resultLoan.forEach((resultLoan) => {
      resultLoan.textContent = amount.toString();
    });
    resultInterest.forEach((resultInterest) => {
      resultInterest.textContent = monthlyInterest.toString();
    });
    resultTotal.forEach((resultTotal) => {
      resultTotal.textContent = total.toString();
    });
    resultMonthly.forEach((resultMonthly) => {
      resultMonthly.textContent = monthlyPayment.toString();
    });
  });
});

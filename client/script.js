let allRoles = [];
let allCompanies = [];
let allRows = [];
const getAllRoles = async () => {
    const response = await fetch('http://localhost:5000/api/v1/roles');
    const data = await response.json();
    allRoles = data;
    return data
}

const getAllCompanies = async () => {
    const response = await fetch('http://localhost:5000/api/v1/companies');
    const data = await response.json();
    allCompanies = data;
    return data
}
const drawUserRow = (i = 0) => {
    const rowWrapper = document.createElement('div');
    rowWrapper.classList.add('row-wrapper');
    const nameInput = document.createElement('input');
    const usernameInput = document.createElement('input');
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const roleSelect = document.createElement('select');
    const companySelect = document.createElement('select');

    allRoles.data.data.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.append(role.name)
        roleSelect.append(option);
    })
    allCompanies.data.data.forEach(company => {
        const option = document.createElement('option');
        option.value = company.id;
        option.append(company.name)
        companySelect.append(option);
    })
    allRows.push({
        name: nameInput,
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
        role: roleSelect,
        company: companySelect
    })
    console.log(allRows);
    rowWrapper.append(nameInput, usernameInput, emailInput, passwordInput, roleSelect, companySelect);
    document.getElementById('root').append(rowWrapper)
}
getAllCompanies()
getAllRoles()
const addRowBtn = document.getElementById('addRow')
addRowBtn.addEventListener('click', (e) => {
    drawUserRow()
})
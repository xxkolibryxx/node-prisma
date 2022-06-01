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
    nameInput.placeholder = 'Name'
    const usernameInput = document.createElement('input');
    usernameInput.placeholder = 'username'
    const emailInput = document.createElement('input');
    emailInput.placeholder = 'email'
    const passwordInput = document.createElement('input');
    passwordInput.placeholder = 'password'
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

const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click', async () => {
    const data = allRows.map(({ name, username, email, password, role, company }) => {
        return {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            roleId: +role.value,
            companyId: +company.value
        }
    })
    const response = await fetch('http://localhost:5000/api/v1/users/createMany', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await response.json();
    document.getElementById('root').innerHTML = '';
})
const usersPerPage = 5;
const getAllUsers = async (filter = {}) => {
    const params = Object.keys(filter).reduce((acc, key, i) => {
        acc += `${i === 0 ? '?' : '&'}${key}=${filter[key]}`;
        return acc;
    }, '') || '';
    const response = await fetch(`http://localhost:5000/api/v1/users${params}`);
    const data = await response.json();

    drawAllUsers(data);
}

const drawAllUsers = (data) => {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';
    data.data.data.forEach(user => {
        const row = document.createElement('div');
        row.classList.add('userRow');

        ['name', 'email', 'company', 'role'].forEach(f => {
            const field = document.createElement('div');
            field.append(user[f].name || user[f]);
            row.append(field);
        })
        usersContainer.append(row);
    })

    const usersPerPage = +document.getElementById('usersPerPage').value;
    const pagesCount = Math.ceil((data.data.dataCount) / usersPerPage);
    document.getElementById('usersPagination').innerHTML = '';
    new Array(pagesCount).fill(null).forEach((p, i) => {
        const btn = document.createElement('button');
        btn.append(i + 1);
        btn.addEventListener('click', () => {
            getAllUsers({
                limit: usersPerPage,
                offset: i * usersPerPage,
            })
        })
        document.getElementById('usersPagination').append(btn);
    })
}

const select = document.getElementById('usersPerPage')

select.addEventListener('change', () => {

})

getAllUsers();
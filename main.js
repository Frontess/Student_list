// Массив студентов
let listData = [{
  name: 'Федор',
  surename: 'Орлов',
  lastname: 'Михайлович',
  birthDate: new Date(1992, 04, 11),
  age: '',
  startYear: 2022,
  studentCource: '',
  facult: 'IT'
},
{
  name: 'Нина',
  surename: 'Федорова',
  lastname: 'Александровна',
  birthDate: new Date(1982, 09, 20),
  age: '',
  startYear: 2020,
  studentCource: '',
  facult: 'Экологический'
},
{
  name: 'Петр',
  surename: 'Скворцов',
  lastname: 'Ильич',
  birthDate: new Date(1989, 11, 9),
  age: '',
  startYear: 2017,
  studentCource: '',
  facult: 'Физкультурный'
},
{
  name: 'Раиса',
  surename: 'Шаталова',
  lastname: 'Николаевна',
  birthDate: new Date(1984, 08, 29),
  age: '',
  startYear: 2020,
  studentCource: '',
  facult: 'Востоковедение'
},
{
  name: 'Василий',
  surename: 'Романов',
  lastname: 'Константинович',
  birthDate: new Date(1999, 06, 11),
  age: '',
  startYear: 2019,
  studentCource: '',
  facult: 'Журналистики'
},
]

let sortColumnFlag = 'fio',
    sortDirFlag = true

// Создание элементов
const $app = document.getElementById('app'),
    $addForm = document.getElementById('add-form'),
    $nameInp = document.getElementById('add-form__name-inp'),
    $surenameInp = document.getElementById('add-form__surename-inp'),
    $lastnameInp = document.getElementById('add-form__lastname-inp'),
    $birthInp = document.getElementById('add-form__birth-inp'),
    $startYearInp = document.getElementById('add-form__startYear-inp'),
    $facultInp = document.getElementById('add-form__facult-inp'),

    //$sortFIOBtn = document.getElementById('sort__fio'),
    //$sortFacultBtn = document.getElementById('sort__facult'),

    $filterForm = document.getElementById('filter-form'),
    $fioFilterInp = document.getElementById('filter-form__fio-inp'),
    $facultFilterInp = document.getElementById('filter-form__facult-inp'),

    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody'),
//создаем шапку
    $tableHeadTr = document.createElement('tr'),
    $tableHeadThFIO = document.createElement('th'),
    $tableHeadThBirthYear = document.createElement('th'),
    $tableHeadThStartYear = document.createElement('th'),
    $tableHeadThFacult = document.createElement('th');

   // стили таблицы из bootstrap
$table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered', 'border-success')

//добавляем заголовки в таблицу
$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThBirthYear.textContent = 'Год рождения и возраст'
$tableHeadThStartYear.textContent = 'Годы обучения и номер курса'
$tableHeadThFacult.textContent = 'Факультет'

// добавляем элементы в таблицу
$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThBirthYear)
$tableHeadTr.append($tableHeadThStartYear)
$tableHeadTr.append($tableHeadThFacult)

// собираем таблицу
$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

// Создание Tr одного студента
function createUserTr(oneUser) {
    const $userTr = document.createElement('tr'),
        $userFIO = document.createElement('th'),
        $userBirthYear = document.createElement('th'),
        $userStartYear = document.createElement('th'),
        $userFacult = document.createElement('th');

        $userFIO.textContent = oneUser.fio
        $userBirthYear.textContent = oneUser.age
        $userStartYear.textContent = oneUser.studentCource
        $userFacult.textContent = oneUser.facult

        $userTr.append($userFIO)
        $userTr.append($userBirthYear)
        $userTr.append($userStartYear)
        $userTr.append($userFacult)

    return $userTr
}

// Фильтрация
function filter(arr, prop, value) {
    return arr.filter(function(oneUser) {
        if (oneUser[prop].includes(value.trim())) return true
    });
}

// Рендер
function render(arrData) {
    $tableBody.innerHTML = '';
    let copyListData = [...arrData]

    console.log(copyListData)

    // Подготовка
    for (const oneUser of copyListData) {
        // формируем ФИО
        oneUser.fio = oneUser.surename + ' ' + oneUser.name + ' ' + oneUser.lastname

        // делаем формат отображения даты рождения и высчитываем возраст
        let birthDay = oneUser.birthDate.getDate();
        let birthMonth = oneUser.birthDate.getMonth() + 1;
        let birthYear = oneUser.birthDate.getFullYear();
        const currentTime = new Date()
        const currentYear = currentTime.getFullYear()
        let currentAge = currentYear - birthYear;
        oneUser.age = birthDay + '.' + birthMonth + '.' + birthYear + '(' + currentAge + ' лет)'

        // делаем формат отображения времени обучения и курса
        let startYear = oneUser.startYear;
        let finishYear = startYear + 4;
        let countCourse = currentYear - startYear;

        if (currentYear > finishYear) {
            oneUser.studentCource = startYear  + '-' + finishYear + '(' + 'курс завершен)';
        } else {
            oneUser.studentCource = startYear  + '-' + finishYear + '(' + countCourse  + ' курс)';
        }
        console.log(oneUser.studentCource);
}

    // Сортировка от меньшего к большему и от большего к меньшему
    copyListData = copyListData.sort(function(a, b) {
        let sort = a[sortColumnFlag] < b[sortColumnFlag]
       if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
       return sort ? -1 : 1
    })

    console.log(copyListData);

    // Фильтрация
    if ($fioFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'fio', $fioFilterInp.value)
    }

    if ($facultFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'facult', $facultFilterInp.value)
    }

    // Отрисовка
    for (const oneUser of copyListData) {
        const $newTr = createUserTr(oneUser)
        $tableBody.append($newTr)
    }
}

render(listData)

// Проверка отправки формы
$addForm.addEventListener('submit', function(e) {
    e.preventDefault()

    // Валидация
    if ($nameInp.value.trim() == "") {
        alert('Введите полное имя')
        return
    }

    if ($surenameInp.value.trim() <= 8) {
        alert('Введите фамилию полностью')
        return
    }

    if ($lastnameInp.value.trim() <= 8) {
        alert('Введите отчество полностью')
        return
    }

    if ($birthInp.value.trim() == "") {
        alert('Дата рождения не введена')
        return
    }

    if ($startYearInp.value.trim() == "") {
      alert('Введите год начала обучения')
      return
    }

    if ($facultInp.value.trim() == "") {
      alert('Введите факультет')
      return
    }

    s = $birthInp.value.trim().split('-');

    listData.push({
        name: $nameInp.value.trim(),
        surename: $surenameInp.value.trim(),
        lastname: $lastnameInp.value.trim(),
        birthDate: new Date(s[0], s[1] - 1, s[2]), //$birthInp.value.trim(),
        age: '',
        startYear: parseInt($startYearInp.value.trim()),
        studentCource: '',
        facult: $facultInp.value.trim()
    })


    render(listData)
})

// События сортировки по заголовкам таблицы
$tableHeadThFIO.addEventListener('click', function() {
    sortColumnFlag = 'fio'
    sortDirFlag = !sortDirFlag
    render(listData)
})

$tableHeadThBirthYear.addEventListener('click', function() {
    sortColumnFlag = 'birthYear'
    sortDirFlag = !sortDirFlag
    render(listData)
})

$tableHeadThStartYear.addEventListener('click', function() {
    sortColumnFlag = 'startYear'
    sortDirFlag = !sortDirFlag
    render(listData)
})

$tableHeadThFacult.addEventListener('click', function() {
    sortColumnFlag = 'facult'
    sortDirFlag = !sortDirFlag
    render(listData)
})

// Фильтр
$filterForm.addEventListener('submit', function(event) {
    event.preventDefault()
})

$fioFilterInp.addEventListener('input', function() {
    render(listData)
})
$facultFilterInp.addEventListener('input', function() {
    render(listData)
})

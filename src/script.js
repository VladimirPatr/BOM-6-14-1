import modulesData from './script/data';
import modulesCreateElements from './script/createElements.mjs';
import {renderPhoneBook, renderContacts as contactsRender}  from './script/render';
import modulesControl from './script/control';
import modulesServiceStorage from './script/serviceStorage';

// import './css/bootstrap.min.css';
import './index.html';
import './scss/index.scss';


const {
  data, 		
} = modulesData;

const {
  addContactData,
  createContainer,
  createHeader,
  createLogo,
  createProposal,
  createMain,
  createFooter,
  createButtonsGroup,
  createTable,
  createForm,
  createRow ,  		
} = modulesCreateElements;

const {
  hoverRow,
  modalControl,
  deleteControl,
  addContactPage,
  formControl,		
} = modulesControl;

const {
  removeStorage,
  getStorage,
  setStorage,
  firsLoad,		
} = modulesServiceStorage;

{

  //функция запуска всех функций INIT
  const init = (selectorApp, title) => {
    localStorage.clear();
    //получение констант
    const app = document.querySelector(selectorApp)

    const { list, logo, btnAdd, formOverlay, form, btnDel } = renderPhoneBook(
      app,
      title,
    )

    //функционал   
    let firstStor = firsLoad();

    // const allRow = contactsRender(list, data) //присваиват создание таблицы и заполнение её из массива контактов
    const allRow = contactsRender(list, firstStor) //присваиват создание таблицы и заполнение её из массива контактов DATA
    const { closeModal } = modalControl(btnAdd, formOverlay) //присваивает функцию закрытия и открытия модального окна по клику

    hoverRow(allRow, logo); //функция для показа номера тел в шапке при наведении на него в таблице
    deleteControl(btnDel, list) //вызывает фунцию добавления столбца с иконками удаления строк
    formControl(form, list, closeModal) //функция с событиями формы модального окна при срабатывании submit
  }
  window.addEventListener('storage', e => {
    document.querySelector('#app').innerHTML = '';
   init('#app', 'Владимир')
  })

  window.phoneBookInit = init
}

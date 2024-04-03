import './style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'
import Toastr from 'toastr';

const initApp = (): void => {
    const fullList = FullList.instance;
    const templates = ListTemplate.instance;

    Toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: true,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: undefined,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 5000,
        extendedTimeOut: 1000,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    };
    
    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;
    
   
    itemEntryForm.addEventListener('submit', (e: SubmitEvent): void => {
        e.preventDefault();
        
        const input = document.getElementById('Items') as HTMLInputElement;

        const newEntryText: string = input.value?.trim();
        if(!newEntryText.length) {
            Toastr.error("Field cannot be empty!", 'Field is required');
            return;
        };

        if(fullList.isExist(newEntryText.toLowerCase())){
            Toastr.info(`${newEntryText} task already exisits in the list.`, 'Duplicate Found'); 
            return;
        }

        const itemId: number = fullList.list.length?(parseInt(fullList.list[fullList.list.length - 1].id) + 1): 1;

        const newItem = new ListItem(itemId.toString(), newEntryText);

        fullList.addItem(newItem);

        templates.render(fullList);
        input.value= '';
    });

    fullList.load();
    templates.render(fullList);
}

document.addEventListener('DOMContentLoaded', initApp);
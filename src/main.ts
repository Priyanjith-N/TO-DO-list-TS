import './style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fullList = FullList.instance;
    const templates = ListTemplate.instance;
    
    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;
    
   
    itemEntryForm.addEventListener('submit', (e: SubmitEvent): void => {
        e.preventDefault();
        
        const input = document.getElementById('Items') as HTMLInputElement;

        const newEntryText: string = input.value?.trim();
        if(!newEntryText.length) return;

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
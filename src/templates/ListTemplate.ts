import FullList from "../model/FullList";

interface DOMList {
    div: HTMLDivElement;
    clear(): void;
    render(fullList: FullList): void; 
}

export default class ListTemplate implements DOMList {

    div: HTMLDivElement;

    static instance: ListTemplate = new ListTemplate;

    private constructor() {
        this.div = document.getElementById('listItems') as HTMLDivElement;
    }

    clear(): void {
        this.div.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();

        fullList.list.forEach(item => {
            const divList = document.createElement('div') as HTMLDivElement;
            divList.className = "flex justify-between items-center py-2 px-2 border-[0.75px] border-slate-700 mb-4"

            const p = document.createElement('p') as HTMLParagraphElement;

            p.setAttribute('data-id', item.id);

            p.textContent = item.item;

            if(item.checked){
                p.className = 'line-through';
            }

            divList.append(p);

            const actionDiv = document.createElement('div') as HTMLDivElement;

            actionDiv.className = 'flex items-center gap-2 justify-center'

            const doneBtn = document.createElement('span') as HTMLSpanElement;

            doneBtn.className = 'material-symbols-outlined text-green-700 cursor-pointer'

            doneBtn.setAttribute('data-id', item.id);

            doneBtn.textContent = 'done';

            actionDiv.append(doneBtn);
            
            const deleteBtn = document.createElement('span') as HTMLSpanElement;

            deleteBtn.className = 'material-symbols-outlined text-red-800 cursor-pointer'

            deleteBtn.setAttribute('data-id', item.id);
            
            deleteBtn.textContent = 'delete';

            actionDiv.append(deleteBtn);

            divList.append(actionDiv);

            doneBtn.addEventListener('click', () => {
                item.checked = true;
                p.className = 'line-through';
                fullList.save();
            });

            deleteBtn.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });

            this.div.append(divList);
        })
    }
}
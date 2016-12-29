import {Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter} from '@angular/core';
import {Word} from './Word';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'map-component',
    template: ` 
    <div class="ui-g">
         <div class="ui-g-1">Key Words </div>
         <div class="ui-g-6">
            <p-dropdown [options]="kewWords" [style]="{'width':'200px'}" (onChange)="optionChange($event)"></p-dropdown> 
         </div>
    </div>
    <div class="ui-g">
        <div class="ui-g-6">            
            <word  *ngFor="let word of words;let i=index;" [text]="word" [index]="i" (onWordClick)="onWordClick($event)"></word>
        </div>    
        <div class="ui-g-4">
                <button type="button" pButton (click)="SaveMappedTokens()"  label="Save"></button>
        </div>       
    </div>   
   
    `,
    styles: [`
        
    `]
})

export class MapComponent implements OnInit {
    kewWords: SelectItem[];
    words: string[];
    @ViewChildren(Word) wordList = new QueryList<Word>();
    tokens: any = {};
    activeToken: string;
    @Input() set text(val) {
        if (val) {
            this.words = val.split(/\s+/gm);
        }
    }
    @Output() onSave = new EventEmitter<any>();
    invoice: string;
    total: string;
    currency: string;
    constructor() { }

    ngOnInit() {
        this.kewWords = [
            { label: 'Select Key Word', value: null },
            { label: 'Invoice No', value: 'invoice' },
            { label: 'Amount', value: 'total' },
        ];
        this.words = [];
    }
    private SaveMappedTokens() {       
        let res = {};        
        Object.keys(this.tokens)
            .forEach(key => {
                res[key] = this.tokens[key].map(ob=>( {
                    ctrlKey: ob.ctrlKey,
                    index: ob.index,
                    maped: ob.maped,
                    selected: ob.selected,
                    text: ob.text,
                    token: ob.token
                }));
            });
       
        this.onSave.emit(JSON.stringify(res));
    }
    private optionChange(ev: any) {
        if (ev.value == null) return;
        const token = ev.value;
        this.activeToken = token;
        if (!this.tokens[token]) {
            this.tokens[token] = [];
        }        
        this.wordList.toArray().forEach(w => w.selected = false);
        this.tokens[token].forEach(w => w.selected = true);
        for (var prop in this.tokens) {
            prop === token ? this.setWord(this.tokens[prop], true, prop) :
                this.setWord(this.tokens[prop], false, prop)
        }

    }
    private setWord(words, isSelected, token) {
        words.forEach(_ => { _.selected = isSelected; _.maped = !isSelected; _.token = token; });
    }
    private onWordClick(word: Word) {

        if (this.tokens[this.activeToken]) {
            if (word.ctrlKey) {
                this.tokens[this.activeToken].forEach(_ => _.ctrlKey = false);
                if (this.tokens[this.activeToken].indexOf(word) !== -1) {                    
                    word.ctrlKey = true; return;
                }
            }
            word.selected ? this.tokens[this.activeToken].push(word) :
                this.tokens[this.activeToken].splice(this.tokens[this.activeToken].indexOf(word), 1)
        } else { word.selected = false; }
        
    }
   
    private calculate() {        
        const totalRes = this.getValue(this.tokens.total);
        this.total = totalRes.substr(1);
        this.currency = totalRes.substr(0, 1);
    }
    private getValue(arr: any[]) {
        arr = arr.sort((a, b) => a.index - b.index);
        if (arr.length == 0) {
            return '';
        }
        else if (arr.length == 1) {
            return this.words[arr[0].index];
        }
        const item = arr.find(_ => _.ctrlKey);
        if (item) {
            const index = arr.indexOf(item), len = arr.length;
            let find: boolean = false;
            if (index - 1 >= 0) {
                const it = arr[index - 1];
                if (it.text === this.words[it.index]) {
                    find = true;
                }
            }
            if (index + 1 < len) {
                const it = arr[index + 1];
                if (it.text === this.words[it.index]) {
                    find = true;
                }
            }
            if (find) {
                return this.words[item.index];
            }
            if (index - 1 >= 0) {
                const it = this.words.find(_=>_===arr[index - 1].text);
                if (it) {
                    return this.words[this.words.indexOf(it) + 1];
                }
            }
            if (index + 1 < len) {
                const it = this.words.find(_ => _ === arr[index + 1].text);
                if (it) {
                    return this.words[this.words.indexOf(it) - 1];
                }
            }

        }
        
    }

   
}
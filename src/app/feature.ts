import { Component } from "@angular/core";

@Component({})

export class Feature {
    
    getNewUrl(newUrl){
        newUrl = newUrl.trim().toLowerCase().split(' ').join('-');
        let getnewUrl = "";
        
        for(let i = 0; i < newUrl.length; i++){
            let str = newUrl[i];
            let result = str.match(/[a-z0-9]/);
            
            if(result === null){
                result =  this.getNewLetter(newUrl[i])
            }            
            getnewUrl += result
        }
        return getnewUrl;
    }
    getNewLetter(getLetter){
        switch(getLetter){
            
            case 'á':
            return 'a'
            
            case 'à':
            return 'a'
            
            case 'â':
            return 'a'
            
            case 'ã':
            return 'a'
            
            case 'ä':
            return 'a'
            
            case 'å':
            return 'a'
            
            case 'æ':
            return 'ae'
            
            case 'ç':
            return 'c'
            
            case 'è':
            return 'e'
            
            case 'é':
            return 'e'
            
            case 'ê':
            return 'e'
            
            case 'ë':
            return 'e'
            
            case 'ì':
            return 'i'
            
            case 'í':
            return 'i'
            
            case 'î':
            return 'i'
            
            case 'ï':
            return 'i'
            
            case 'ð':
            return 'o'
            
            case 'ñ':
            return 'n'
            
            case 'ò':
            return 'o'
            
            case 'ó':
            return 'o'
            
            case 'ô':
            return 'o'
            
            case 'õ':
            return 'o'
            
            case 'ö':
            return 'o'
            
            case 'ø':
            return 'o'
            
            case 'ù':
            return 'u'
            
            case 'ú':
            return 'u'
            
            case 'û':
            return 'u'
            
            case 'ü':
            return 'u'
            
            case 'ý':
            return 'y'
            
            case 'ÿ':
            return 'y'
            
            default:
            return '-'
        }
        
    }
}
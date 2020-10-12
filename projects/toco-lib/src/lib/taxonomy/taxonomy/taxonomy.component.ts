/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */


import { Component, OnInit, OnDestroy } from '@angular/core';

import { Vocabulary } from '../../entities';

@Component({
    selector: 'toco-taxonomy',
    templateUrl: './taxonomy.component.html',
    styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent implements OnInit, OnDestroy{

    vocabs = { title: 'Vocabularios', cols: 1, rows: 1 };
    terms = { title: 'Terminos de', cols: 1, rows: 2 };

    current_vocab = {name: '', description: ''};

    currentVocab: Vocabulary;

    constructor()
    { }

    ngOnInit(): void {
    }
    vocabChange(vocab: Vocabulary){
        this.currentVocab = vocab;
    }
    ngOnDestroy(): void {
    }
}

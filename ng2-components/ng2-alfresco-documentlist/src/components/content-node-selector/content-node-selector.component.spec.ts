/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { MaterialModule } from '../../material.module';
import { DocumentListService } from '../../services/document-list.service';
import { SearchService } from '../../services/search.service';
import { DocumentListComponent } from '../document-list.component';
import { DocumentMenuActionComponent } from '../document-menu-action.component';
import { EmptyFolderContentDirective } from '../empty-folder/empty-folder-content.directive';
import { ContentNodeSelectorComponent } from './content-node-selector.component';

describe('ContentNodeSelectorComponent', () => {

    let component: ContentNodeSelectorComponent;
    let fixture: ComponentFixture<ContentNodeSelectorComponent>;
    let element: DebugElement;
    let data: any;

    function setupTestbed(plusProviders) {
        TestBed.configureTestingModule({
            imports: [
                CoreModule.forRoot(),
                DataTableModule.forRoot(),
                MaterialModule
            ],
            declarations: [
                DocumentListComponent,
                DocumentMenuActionComponent,
                EmptyFolderContentDirective,
                ContentNodeSelectorComponent
            ],
            providers: [
                DocumentListService,
                SearchService,
                ...plusProviders
            ]
        });
    }

    afterEach(() => {
        fixture.destroy();
        TestBed.resetTestingModule();
    });

    describe('Dialog features', () => {

        beforeEach(async(() => {
            data = {
                title: 'Move along citizen...'
            };

            setupTestbed([{ provide: MD_DIALOG_DATA, useValue: data }]);
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentNodeSelectorComponent);
            element = fixture.debugElement;
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        describe('Data injecting with the "Material dialog way"', () => {

            it('should show the INJECTED title', () => {
                const titleElement = fixture.debugElement.query(By.css('[data-automation-id="content-node-selector-title"]'));
                expect(titleElement).not.toBeNull();
                expect(titleElement.nativeElement.innerText).toBe('Move along citizen...');
            });

            xit('should trigger the INJECTED select event when selection has been made', () => {

            });
        });

        describe('Cancel button', () => {

            let dummyMdDialogRef;

            beforeEach(() => {
                dummyMdDialogRef = <MdDialogRef<ContentNodeSelectorComponent>> { close: () => {} };
            });

            it('should be shown if dialogRef is injected', () => {
                const componentInstance = new ContentNodeSelectorComponent(null, data, dummyMdDialogRef);
                expect(componentInstance.inDialog).toBeTruthy();
            });

            it('should should call the close method in the injected dialogRef', () => {
                spyOn(dummyMdDialogRef, 'close');
                const componentInstance = new ContentNodeSelectorComponent(null, data, dummyMdDialogRef);

                componentInstance.close();

                expect(dummyMdDialogRef.close).toHaveBeenCalled();
            });
        });
    });

    describe('Parameters', () => {

        beforeEach(async(() => {
            setupTestbed([]);
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentNodeSelectorComponent);
            element = fixture.debugElement;
            component = fixture.componentInstance;
        });

        it('should show the title', () => {
            component.title = 'Move along citizen...';
            fixture.detectChanges();

            const titleElement = fixture.debugElement.query(By.css('[data-automation-id="content-node-selector-title"]'));
            expect(titleElement).not.toBeNull();
            expect(titleElement.nativeElement.innerText).toBe('Move along citizen...');
        });

        xit('should trigger the select event when selection has been made', () => {

        });
    });

    describe('Cancel button', () => {

        it('should not be shown if dialogRef is NOT injected', () => {
            const closeButton = fixture.debugElement.query(By.css('[content-node-selector-actions-cancel]'));
            expect(closeButton).toBeNull();
        });
    });

});


import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Sort } from '@angular/material';
import { _isNumberValue } from '@angular/cdk/coercion';

/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to 
 * flaky browser support and the value not being defined in Closure's typings. 
 */
const MAX_SAFE_INTEGER: number = 9007199254740991;

/**
 * The data sort direction. 
 */
export enum SortDirection {
    /**
     * Sorts the data in the ascending order. 
     */
    asc = 'asc',

    /**
     * Sorts the data in the descending order. 
     */
    desc = 'desc',

    /**
     * Sorts the data in the original order or does not sort them. 
     */
    orig = ''
};

/**
 * Checks if a data object matches the data source's filter string. By default, each data object 
 * is converted to a string of its properties and returns true if the filter has 
 * at least one occurrence in that string. By default, the filter string has its whitespace 
 * trimmed and the match is case-insensitive. 
 * May be overridden for a custom implementation of filter matching. 
 * @param data Data object used to check against the filter. 
 * @param filter Filter string that has been set on the data source. 
 * @return Returns true whether the filter matches against the data; otherwise, false. 
 */
function filterPredicate<T>(data: T, filter: string): boolean
{
    /* Transforms the data into a lowercase string of all property values. */
    const dataStr: string = Object.keys(data).reduce((
        (currentTerm, key): string => {
            /* Use an obscure Unicode character to delimit the words in the concatenated string. 
             * This avoids matches where the values of two columns combined will match the user's query 
             * (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something 
             * that has a very low chance of being typed in by somebody in a text field. This one in 
             * particular is "White up-pointing triangle with dot" from 
             * https://en.wikipedia.org/wiki/List_of_Unicode_characters. */
            return currentTerm + data[key] + '◬';
        }), '').toLowerCase();

    /* Transforms the filter by converting it to lowercase and removing whitespace. */
    const transformedFilter: string = filter.trim().toLowerCase();

    return (dataStr.indexOf(transformedFilter) != -1);
}

/**
 * Data accessor function that is used for accessing data properties for sorting through 
 * the default `sortData` function. 
 * This default function assumes that the sort header IDs (which defaults to the column name) 
 * matches the data's properties (e.g. column Xyz represents data['Xyz']). 
 * May be overridden for a custom implementation of different behavior. 
 * @param data Data object that is being accessed. 
 * @param sortHeaderId The name of the column that represents the data. 
 */
function sortingDataAccessor<T>(data: T, sortHeaderId: string): string | number
{
    const value: any = data[sortHeaderId];

    if (_isNumberValue(value))
    {
        const numberValue: number = Number(value);

        /* Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we 
         * leave them as strings. For more info: https://goo.gl/y5vbSg. */
        return (numberValue < MAX_SAFE_INTEGER ? numberValue : value);
    }

    return value;
}

/**
 * Gets a sorted copy of the data array based on the state of the `MatSort`. Called 
 * after changes are made to the filtered data or when sort changes are emitted from `MatSort`. 
 * By default, the function retrieves the active sort and its direction and compares data 
 * by retrieving data using the `sortingDataAccessor`. 
 * May be overridden for a custom implementation of data ordering. 
 * @param data The array of data that should be sorted. 
 * @param sort The connected `MatSort` that holds the current sort state. 
 */
function sortData<T>(data: T[], sort: Sort): T[]
{
    const active: string = sort.active;
    const direction: SortDirection = sort.direction as SortDirection;

    if ((!active) || (direction == SortDirection.orig)) return data;

    return data.sort((a: T, b: T): number => {
        let valueA: string | number = sortingDataAccessor(a, active);
        let valueB: string | number = sortingDataAccessor(b, active);

        /**
         * If both `valueA` and `valueB` exist (truthy), then compare the two. Otherwise, checks if 
         * one value exists while the other doesn't. In this case, existing value should come last. 
         * This avoids inconsistent results when comparing values to undefined/null. 
         * If neither value exists, returns 0 (equal). 
         */

        let comparatorResult: number = 0;

        if ((valueA != null) && (valueB != null))
        {
            /* Checks if one value is greater than the other one; if equal, `comparatorResult` should remain 0. */

            if (valueA > valueB) comparatorResult = 1;
            else if (valueA < valueB) comparatorResult = -1;
        }
        else if (valueA != null) comparatorResult = 1;
        else if (valueB != null) comparatorResult = -1;

        return comparatorResult * ((direction == SortDirection.asc) ? 1 : -1);
    });
}

export interface User {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    },
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    },
    registrationDate: Date
}

export interface Sort<T>
{
    //property: keyof T;
    property: string;
    order: 'asc' | 'desc' | '';
}

export interface PageRequest/*<T>*/
{
    page: number;
    size: number;
    sort?: Sort
    //sort?: Sort<T>;
}

//TODO: Esta estructura es sustituida por 'Page' en forma genérica. 
export interface Page1<T>
{
    content: T[];
    totalElements: number;
    size: number;
    number: number;
}

/**
 * An interface that represents the requested page. 
 * The generic parameter T always refers to the type of data that it is dealing with. 
 */
export interface Page/*<T>*/
{
    /**
     * Returns the list of items. 
     * By default, its value is `[]`. 
     */
    data: any[];

    /**
     * Returns the total number of items being paged. 
     * By default, its value is `0`. 
     */
    totalData: number;

    /**
     * Returns the zero-based page index of the displayed list of items. 
     * By default, its value is `0`. 
     */
    pageIndex?: number;

    /**
     * Returns the number of items to display on a page. 
     * By default, its value is `50`. 
     */
    pageSize?: number;
}

export interface UserQuery
{
    search: string;
    registration: Date;
}

@Injectable({
    providedIn: "root"
})
export class UserService
{
    page(request: PageRequest/*<User>*/, query: UserQuery): Observable<Page1<User>>
    {
        // fake pagination, do your server request here instead
        let filteredUsers = this.users;
        let { search, registration } = query;

        if (search)
        {
            search = search.toLowerCase();
            filteredUsers = filteredUsers.filter(
                ({ name, username, email }) =>
                    name.toLowerCase().includes(search) ||
                    username.toLowerCase().includes(search) ||
                    email.toLowerCase().includes(search)
            );
        }

        if (registration)
        {
            filteredUsers = filteredUsers.filter(
                ({ registrationDate }) =>
                    registrationDate.getFullYear() === registration.getFullYear() &&
                    registrationDate.getMonth() === registration.getMonth() &&
                    registrationDate.getDate() === registration.getDate()
            );
        }

        if (request.sort)
        {
            filteredUsers = sortData(filteredUsers, request.sort);
        }

        const start = request.page * request.size;
        const end = start + request.size;
        const pageUsers = filteredUsers.slice(start, end);
        const page = {
            content: pageUsers,
            number: request.page,
            size: pageUsers.length,
            totalElements: filteredUsers.length
        };

        return of(page).pipe(delay(2000));
    }

    private users: User[] = [
        {
            id: 1,
            name: "Leanne Graham",
            registrationDate: new Date(1565575044121),
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        },
        {
            id: 2,
            name: "Ervin Howell",
            registrationDate: new Date(1565575044121),
            username: "Antonette",
            email: "Shanna@melissa.tv",
            address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
                geo: {
                    lat: "-43.9509",
                    lng: "-34.4618"
                }
            },
            phone: "010-692-6593 x09125",
            website: "anastasia.net",
            company: {
                name: "Deckow-Crist",
                catchPhrase: "Proactive didactic contingency",
                bs: "synergize scalable supply-chains"
            }
        },
        {
            id: 3,
            name: "Clementine Bauch",
            registrationDate: new Date(1565575044121),
            username: "Samantha",
            email: "Nathan@yesenia.net",
            address: {
                street: "Douglas Extension",
                suite: "Suite 847",
                city: "McKenziehaven",
                zipcode: "59590-4157",
                geo: {
                    lat: "-68.6102",
                    lng: "-47.0653"
                }
            },
            phone: "1-463-123-4447",
            website: "ramiro.info",
            company: {
                name: "Romaguera-Jacobson",
                catchPhrase: "Face to face bifurcated interface",
                bs: "e-enable strategic applications"
            }
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            registrationDate: new Date(1565575044121),
            username: "Karianne",
            email: "Julianne.OConner@kory.org",
            address: {
                street: "Hoeger Mall",
                suite: "Apt. 692",
                city: "South Elvis",
                zipcode: "53919-4257",
                geo: {
                    lat: "29.4572",
                    lng: "-164.2990"
                }
            },
            phone: "493-170-9623 x156",
            website: "kale.biz",
            company: {
                name: "Robel-Corkery",
                catchPhrase: "Multi-tiered zero tolerance productivity",
                bs: "transition cutting-edge web services"
            }
        },
        {
            id: 5,
            name: "Chelsey Dietrich",
            registrationDate: new Date(1550478139234),
            username: "Kamren",
            email: "Lucio_Hettinger@annie.ca",
            address: {
                street: "Skiles Walks",
                suite: "Suite 351",
                city: "Roscoeview",
                zipcode: "33263",
                geo: {
                    lat: "-31.8129",
                    lng: "62.5342"
                }
            },
            phone: "(254)954-1289",
            website: "demarco.info",
            company: {
                name: "Keebler LLC",
                catchPhrase: "User-centric fault-tolerant solution",
                bs: "revolutionize end-to-end systems"
            }
        },
        {
            id: 6,
            name: "Mrs. Dennis Schulist",
            registrationDate: new Date(1550478139234),
            username: "Leopoldo_Corkery",
            email: "Karley_Dach@jasper.info",
            address: {
                street: "Norberto Crossing",
                suite: "Apt. 950",
                city: "South Christy",
                zipcode: "23505-1337",
                geo: {
                    lat: "-71.4197",
                    lng: "71.7478"
                }
            },
            phone: "1-477-935-8478 x6430",
            website: "ola.org",
            company: {
                name: "Considine-Lockman",
                catchPhrase: "Synchronised bottom-line interface",
                bs: "e-enable innovative applications"
            }
        },
        {
            id: 7,
            name: "Kurtis Weissnat",
            registrationDate: new Date(1550478139234),
            username: "Elwyn.Skiles",
            email: "Telly.Hoeger@billy.biz",
            address: {
                street: "Rex Trail",
                suite: "Suite 280",
                city: "Howemouth",
                zipcode: "58804-1099",
                geo: {
                    lat: "24.8918",
                    lng: "21.8984"
                }
            },
            phone: "210.067.6132",
            website: "elvis.io",
            company: {
                name: "Johns Group",
                catchPhrase: "Configurable multimedia task-force",
                bs: "generate enterprise e-tailers"
            }
        },
        {
            id: 8,
            name: "Nicholas Runolfsdottir V",
            registrationDate: new Date(1550478139234),
            username: "Maxime_Nienow",
            email: "Sherwood@rosamond.me",
            address: {
                street: "Ellsworth Summit",
                suite: "Suite 729",
                city: "Aliyaview",
                zipcode: "45169",
                geo: {
                    lat: "-14.3990",
                    lng: "-120.7677"
                }
            },
            phone: "586.493.6943 x140",
            website: "jacynthe.com",
            company: {
                name: "Abernathy Group",
                catchPhrase: "Implemented secondary concept",
                bs: "e-enable extensible e-tailers"
            }
        },
        {
            id: 9,
            name: "Glenna Reichert",
            registrationDate: new Date(1550478139234),
            username: "Delphine",
            email: "Chaim_McDermott@dana.io",
            address: {
                street: "Dayna Park",
                suite: "Suite 449",
                city: "Bartholomebury",
                zipcode: "76495-3109",
                geo: {
                    lat: "24.6463",
                    lng: "-168.8889"
                }
            },
            phone: "(775)976-6794 x41206",
            website: "conrad.com",
            company: {
                name: "Yost and Sons",
                catchPhrase: "Switchable contextually-based project",
                bs: "aggregate real-time technologies"
            }
        },
        {
            id: 10,
            name: "Clementina DuBuque",
            registrationDate: new Date(1550478139234),
            username: "Moriah.Stanton",
            email: "Rey.Padberg@karina.biz",
            address: {
                street: "Kattie Turnpike",
                suite: "Suite 198",
                city: "Lebsackbury",
                zipcode: "31428-2261",
                geo: {
                    lat: "-38.2386",
                    lng: "57.2232"
                }
            },
            phone: "024-648-3804",
            website: "ambrose.net",
            company: {
                name: "Hoeger LLC",
                catchPhrase: "Centralized empowering task-force",
                bs: "target end-to-end models"
            }
        }
    ];
}

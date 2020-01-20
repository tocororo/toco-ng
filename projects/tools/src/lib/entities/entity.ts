

/*** La idea de esta clase es tener un deserializador */
export class EntityBase extends Object {

  load_from_data(data: any) {
    const keys = Object.keys(this);
    console.log(keys)
    console.log(data)
    for (const key of keys) {
      if (data[key]) {
        if (this[key] instanceof EntityBase) {
          this[key].load_from_data(data[key]);
          console.log(data[key])
        } else {
          this[key] = data[key];
        }
      }
    }
  }
}


/**
 * Created by Edel on 02/04/2018.
 */
export class Entity extends EntityBase {
    id = 0;
    raw_data: String;
    created_at: String;
    updated_at: String;
    constructor() { super(); }

    /**
     * return JSON.stringify, using a function to exclude object fields id and uuid
     */
    stringify(): string  {
      return JSON.stringify(this, (k, v) => {
        if (k !== 'id' && k !== 'uuid') {
          return v;
        }
      });
    }
}


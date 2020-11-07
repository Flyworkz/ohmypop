const db = require('../database');

class Pop {
    // On factorise pour éviter de se répéter
    constructor(data) {
        this.update(data);
    }

    static async findOne(id) {
        const thePop = await db.query('SELECT * FROM pop WHERE id = $1;', [id]);
        return thePop.rows[0];
    }

    static async findAll() {
        const pops = await db.query('SELECT * FROM pop;');
        return pops.rows;
    }

    static async findByCollection(collection) {
        const pops = await db.query('SELECT * FROM pop_by_collection($1);', [collection]);
        return pops.rows;
    }

    static async findByLabel(label) {
        const thePop = await db.query('SELECT * FROM pop WHERE label = $1;', [label]);
        return thePop.rows[0];
    }

    update(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
    // Met à jour le pop en bdd si l'instance de pop(this) possède un ID sinon l'insert dans la bdd et retourne le pop inséré avec son id
    async save() {
        if (this.id) {
            await db.query(`
                UPDATE pop 
                SET 
                    figurine_number = $1, 
                    "collection" = $2, 
                    "label" = $3, 
                    "status" = $4,
                    "image" = $5
                WHERE id = $6
            `, [
                this.figurine_number, 
                this.collection, 
                this.label, 
                this.status,
                this.image,
                this.id
            ]);
        } else {
            const insertedPop = await db.query('SELECT * FROM new_pop($1);', [this]);
    
            if (insertedPop.rowCount) {
                for (const prop in insertedPop) {
                    this[prop] = insertedPop.rows[0][prop];
                }          
            }
        }
    }

    async delete() {
        const deletedPop = await db.query('DELETE FROM pop WHERE id = $1', [this.id]);
        if (deletedPop.rowCount) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Pop; 
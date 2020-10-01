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
                    "status" = $4
                WHERE id = $5
            `, [
                this.figurine_number, 
                this.collection, 
                this.label, 
                this.status,
                this.id
            ]);
        } else {
            const insertedPop = await db.query('SELECT * FROM new_pop($1);', [this]);
    
            if (insertedPop.rowCount) {
                this.id = insertedPop.rows[0].id;
            }
        }
    }

    async delete() {
        if (this.id) {
            await db.query('DELETE FROM pop WHERE id = $1', [this.id]);
        }
    }
}

module.exports = Pop; 
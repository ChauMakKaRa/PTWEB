const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collected("contacts");
    }

    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            adress: payload.adress,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        //xóa
        objects.key(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    
    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.contact.findOneAndUpdate(
            contact,
            { $set: {favorite: contact.favorite === true }},
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }

    //Phương thức findById(id)
    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) :null,
        });
    }

    //Phương thức update(id, document)
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            {returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({favorite: true});
    }

    async deleteAll() {
        const result = await this.Contact.deleteAll({});
        return result.deleteCount;
    }
}

module.exports = ContactService;
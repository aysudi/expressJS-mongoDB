const formatMongoData = (doc) => {
    if (Array.isArray(doc)) {
        return doc.map(formatDocument);
    }
    else if (doc && typeof doc === "object") {
        return formatDocument(doc);
    }
    return doc;
};
const formatDocument = (item) => {
    const obj = item.toObject ? item.toObject() : { ...item };
    const { _id, public_id, coverImagePublicId, bookPDFPublicId, ...rest } = obj;
    return {
        id: _id?.toString(),
        ...rest,
    };
};
export default formatMongoData;

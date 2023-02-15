var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const loadFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('../../city.list.json');
    const data = yield response.json();
    console.log(data);
    const searchTerm = 'Sal';
    let result = data.filter((item) => {
        const name = item.name;
        return name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    console.log(result);
});

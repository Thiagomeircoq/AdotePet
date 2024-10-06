import axios from 'axios';
import { ApiService } from './apiService';

export class PetService extends ApiService {
    constructor() {
        super(); 
    }

    async fetchPets(filters: Record<string, any>) {
        try {
            const response = await axios.post(`${this.baseUrl}/pet/filtered`, filters);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pets:', error);
            throw error;
        }
    }
}

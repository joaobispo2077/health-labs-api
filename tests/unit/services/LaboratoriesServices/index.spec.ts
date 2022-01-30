import { LaboratoryStatus } from '@src/entities/Laboratory';
import { LaboratoriesServices } from '@src/services/LaboratoriesServices';
import { FakeLaboratoriesRepositories } from '@tests/mocks/fakes/FakeLaboratoriesRepositories';

const makeLaboratoriesServices = (): LaboratoriesServices => {
  const fakeLaboratoriesRepositories = new FakeLaboratoriesRepositories();

  return new LaboratoriesServices(fakeLaboratoriesRepositories);
};

describe('LaboratoriesServices', () => {
  describe('Happy way', () => {
    it('should be able to create a laboratory', async () => {
      const laboratory = {
        name: 'Laboratório de Teste',
        address: 'Rua Teste, 123',
        status: LaboratoryStatus.ACTIVE,
      };

      const laboratoriesServices = makeLaboratoriesServices();
      const createdLaboratory = await laboratoriesServices.create(laboratory);

      expect(createdLaboratory).toHaveProperty('id');
      expect(createdLaboratory).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          ...laboratory,
        }),
      );
    });
  });
});

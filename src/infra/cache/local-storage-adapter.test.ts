import faker from 'faker';
import { describe, expect, test, vi } from 'vitest';
import '../../data/test/global-mock';
import LocalStorageAdapter from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe.concurrent('LocalStorageAdapter', () => {
  test('Should call localStorage.setItem with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement();

    sut.set(key, value);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test('Should call localStorage.removeItem if value is null', async () => {
    const sut = makeSut();
    const key = faker.database.column();

    sut.set(key, undefined);

    expect(window.localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should call localStorage.getItem with correct value', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement();
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(
      JSON.stringify(value)
    );

    const obj = sut.get(key);

    expect(obj).toEqual(value);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
  });
});

import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import faker from "faker";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credential-erros";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct Body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throw InvalidCredentialsError with HttpPostClient return 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});

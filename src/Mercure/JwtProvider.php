<?php


namespace App\Mercure;


use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class JwtProvider
{
    /**
     * @var ParameterBagInterface
     */
    private $params;

    /**
     * JwtProvider constructor.
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    public function __invoke(): string
    {
        $config = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::plainText($this->params->get('mercure_secret_key')));
        return $config->builder()
            ->withClaim('mercure', ['publish' => ['*']])
            ->getToken($config->signer(), $config->signingKey())
            ->toString();
    }
}
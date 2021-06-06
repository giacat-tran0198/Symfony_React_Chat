<?php


namespace App\Mercure;


use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\Security;

class CookieGenerator
{
    /**
     * @var ParameterBagInterface
     */
    private $params;
    /**
     * @var Security
     */
    private $security;

    /**
     * CookieGenerator constructor.
     * @param ParameterBagInterface $params
     * @param Security $security
     */
    public function __construct(ParameterBagInterface $params, Security $security)
    {
        $this->params = $params;
        $this->security = $security;
    }

    public function generate(): Cookie
    {
        $config = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::plainText($this->params->get('mercure_secret_key')));
        $token = $config->builder()
            ->withClaim('mercure', ['publish' => [sprintf("/%s", $this->security->getUser()->getUserIdentifier())]])
            ->getToken($config->signer(), $config->signingKey())
            ->toString();

        return Cookie::create('mercureAuthorization',
            $token,
            (new \DateTime())
                ->add(new \DateInterval('PT2H')),
            '/.well-known/mercure',
            null,
            false,
            true,
            false,
            'strict'
        );
    }
}
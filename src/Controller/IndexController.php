<?php

namespace App\Controller;

use App\Mercure\CookieGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/", name="index")
     * @param CookieGenerator $cookieGenerator
     * @return Response
     */
    public function index(CookieGenerator $cookieGenerator): Response
    {
        $response = $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);

        $response->headers->setCookie(
            $cookieGenerator->generate()
        );

        return $response;
    }
}

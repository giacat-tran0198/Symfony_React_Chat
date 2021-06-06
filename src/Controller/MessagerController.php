<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Repository\ParticipantRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/messages", name="messages.")
 */
class MessagerController extends AbstractController
{
    const ATTRIBUTES_TO_SERIALIZE = ['id', 'content', 'createdAt', 'mine'];
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var MessageRepository
     */
    private $messageRepository;
    /**
     * @var ParticipantRepository
     */
    private $participantRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * MessagerController constructor.
     * @param EntityManagerInterface $entityManager
     * @param MessageRepository $messageRepository
     * @param ParticipantRepository $participantRepository
     */
    public function __construct(EntityManagerInterface $entityManager,
                                MessageRepository $messageRepository,
                                ParticipantRepository $participantRepository,
                                UserRepository $userRepository)
    {

        $this->entityManager = $entityManager;
        $this->messageRepository = $messageRepository;
        $this->participantRepository = $participantRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/{id}", name="getMessages", methods={"GET"})
     * @param Request $request
     * @param Conversation $conversation
     * @return JsonResponse
     */
    public function index(Request $request, Conversation $conversation): JsonResponse
    {
        // can i view the conversation

        $this->denyAccessUnlessGranted('view', $conversation);

        $messages = $this->messageRepository->findMessageByConversationId(
            $conversation->getId()
        );

        /**
         * @var $message Message
         */
        array_map(function ($message) {
            $message->setMine($message->getUser()->getId() === $this->getUser()->getId());
        }, $messages);


        return $this->json($messages, Response::HTTP_OK, [], [
            'attributes' => self::ATTRIBUTES_TO_SERIALIZE
        ]);
    }

    /**
     * @Route("/{id}", name="newMessage", methods={"POST"})
     * @param Request $request
     * @param Conversation $conversation
     * @param SerializerInterface $serializer
     * @return JsonResponse
     * @throws \Exception
     */
    public function newMessage(Request $request, Conversation $conversation, SerializerInterface $serializer)
    {
        $user = $this->getUser();

//        $recipient = $this->participantRepository->findParticipantByConverstionIdAndUserId(
//            $conversation->getId(),
//            $user->getId()
//        );

        $content = $request->get('content', null);
        $message = new Message();
        $message->setContent($content);
        $message->setUser($this->userRepository->find(2));

        $conversation->addMessage($message);
        $conversation->setLastMessage($message);

        $this->entityManager->getConnection()->beginTransaction();
        try {
            $this->entityManager->persist($message);
            $this->entityManager->persist($conversation);
            $this->entityManager->flush();
            $this->entityManager->commit();
        } catch (\Exception $e) {
            $this->entityManager->rollback();
            throw $e;
        }
        $message->setMine(false);
        $messageSerialized = $serializer->serialize($message, 'json', [
            'attributes' => ['id', 'content', 'createdAt', 'mine', 'conversation' => ['id']]
        ]);

        $message->setMine(true);
        return $this->json($message, Response::HTTP_CREATED, [], [
            'attributes' => self::ATTRIBUTES_TO_SERIALIZE
        ]);
    }
}

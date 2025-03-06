import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';

describe('EventService', () => {
  let service: EventService;
  let eventRepository: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event), // Mock the Event repository
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = [
        { id: 1, name: 'Event 1', date: new Date(), ticketsAvailable: 100 },
      ];
      jest.spyOn(eventRepository, 'find').mockResolvedValue(result as Event[]);

      expect(await service.findAll()).toEqual(result);
      expect(eventRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = { id: 1, name: 'Event 1', date: new Date(), ticketsAvailable: 100 };
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(result as Event);

      expect(await service.findOne(1)).toEqual(result);
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if event is not found', async () => {
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Event with ID 1 not found');
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('updateTicketsAvailable', () => {
    it('should update tickets available for an event', async () => {
      const event = { id: 1, name: 'Event 1', date: new Date(), ticketsAvailable: 100 };
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(event as Event);
      jest.spyOn(eventRepository, 'save').mockResolvedValue({ ...event, ticketsAvailable: 98 } as Event);

      const result = await service.updateTicketsAvailable(1, 2);
      expect(result.ticketsAvailable).toBe(98);
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(eventRepository.save).toHaveBeenCalledWith({ ...event, ticketsAvailable: 98 });
    });

    it('should throw an error if event is not found', async () => {
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateTicketsAvailable(1, 2)).rejects.toThrow('Event with ID 1 not found');
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PraksaBACK.Controllers;
using PraksaBACK.Contexts;
using PraksaBACK.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PraksaTests
{
    [TestClass]
    public class EventsControllerTests
    {
        private EventsController _controller;
        private EventPlannerContext _context;

        [TestInitialize]
        public void Setup()
        {
            // Konfiguracija in-memory baze podataka za testiranje
            var options = new DbContextOptionsBuilder<EventPlannerContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Random naziv baze za izolaciju testova
                .Options;

            _context = new EventPlannerContext(options);
            _controller = new EventsController(_context);

            // Dodajte nekoliko testnih događaja u in-memory bazu
            _context.Events.AddRange(new List<Event>
            {
                new Event { Id = 1, Name = "Test Event 1", Date = DateTime.Now.Date, Time = TimeSpan.FromHours(14), Location = "Test Location 1", Description = "Test Description 1" },
                new Event { Id = 2, Name = "Test Event 2", Date = DateTime.Now.Date.AddDays(1), Time = TimeSpan.FromHours(10), Location = "Test Location 2", Description = "Test Description 2" }
            });
            _context.SaveChanges();
        }
   


        [TestMethod]
        public async Task PostEvent_AddsNewEvent()
        {
            // Arrange
            var newEvent = new Event
            {
                Name = "New Test Event",
                Date = DateTime.Now.Date.AddDays(2),
                Time = TimeSpan.FromHours(15),
                Location = "New Test Location",
                Description = "New Test Description"
            };

            // Act
            var result = await _controller.PostEvent(newEvent);

            // Assert
            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);

            var eventItem = createdAtActionResult.Value as Event;
            Assert.IsNotNull(eventItem);
            Assert.AreEqual(newEvent.Name, eventItem.Name);

            // Provjeri je li događaj dodan u bazu
            var addedEvent = _context.Events.Find(eventItem.Id);
            Assert.IsNotNull(addedEvent);
            Assert.AreEqual(newEvent.Name, addedEvent.Name);
        }

       
    }
}
